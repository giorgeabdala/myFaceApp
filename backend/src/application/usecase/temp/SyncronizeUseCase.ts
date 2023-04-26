import IRepositoryFactory from "../../../domain/factory/IRepositoryFactory";
import ServiceFactory from "../../../infra/factory/ServiceFactory";
import {Appointment, PaymentStatus, Status} from "../../../domain/entities/appointment";
import {Err, Ok, Result} from "ts-results";
import FindEventsCalendarByProfessionalDateUseCase, {
    FindEventsProfessionalOutput
} from "../findEventsCalendarByProfessionalDateUseCase";

import getClientByNameUseCase from "../getClientByName";
import CreateAppointmentUseCase from "../createAppointmentUseCase";
import {CreateAppointmentInput} from "../../dto/createAppointmentDTO";
import {Professional} from "../../../domain/entities/professional";
import GetProfessionalUseCase from "../getProfessionalUseCase";
import SendWhatsAppNotificationUseCase, {WhatsAppNotificationInput} from "../sendWhatsAppNotificationUseCase";


export class SyncronizeInput {
    constructor(
        readonly professionalId: string,
        readonly date: string,
    ) {}
}

type Errors = { quantity: number, names: string[] };

export class SyncronizeOutput {
    constructor(
        public success: Appointment[],
        public errors: Errors,
    ) {}
}

export default class SyncronizeUseCase {
    private output: SyncronizeOutput = new SyncronizeOutput([], {quantity: 0, names: []});

    constructor(
        private readonly factoryRepository: IRepositoryFactory,
        private readonly factoryService: ServiceFactory) {}

    private addError(name: string) {
        this.output.errors.quantity++;
        this.output.errors.names.push(name);
    }

    async execute(input: SyncronizeInput) : Promise<Result<SyncronizeOutput, string>> {
        const professionalUsecase = new GetProfessionalUseCase(this.factoryRepository);
        const professionalOrError = await professionalUsecase.execute(input.professionalId);
        if (professionalOrError.err) return new Err("Erro ao recuperar profissional: " + professionalOrError.err);
        const professional = professionalOrError.unwrap();
        const eventsOrError = await this.findEventsCalendar(input.professionalId, input.date);
        if (eventsOrError.err) return new Err("Erro ao recuperar eventos no google calendar" + eventsOrError.err);
        const events = eventsOrError.unwrap();
        const appointments = await this.saveAppointments(events, professional, this.factoryRepository);
        const notifications = await this.sendWhatsAppNotifications(appointments);

        return  Ok(new SyncronizeOutput(notifications, this.output.errors));
    }


    private async findEventsCalendar(professionalId: string, dateFind: string): Promise<Result<FindEventsProfessionalOutput[], string>> {
        const calendarService = this.factoryService.getGoogleCalendarService();
        const eventsOrError = await new FindEventsCalendarByProfessionalDateUseCase(this.factoryRepository, calendarService)
            .execute({professionalId: professionalId, date: dateFind});
        if (eventsOrError.err) return new Err("Error ao buscar eventos no google" + eventsOrError.err);
        return eventsOrError;
    }


    private async saveAppointments(events: FindEventsProfessionalOutput[], professional: Professional, factoryRepository: IRepositoryFactory): Promise<Appointment[]> {
        const getClientByName = new getClientByNameUseCase(factoryRepository.getClientRepository());
        const createAppointmentUseCase = new CreateAppointmentUseCase(factoryRepository);

        //faz um for no events e salva no banco
        const appointments: Appointment[] = [];
        for (const event of events) {
            event.clientName = this.extractClientName(event);
            const clientOrError = await getClientByName.execute(event.clientName);
            if (clientOrError.err) {
                this.addError(event.clientName);
                console.log('Erro ao buscar cliente ' + clientOrError.err);
                continue;
            }
            const client = clientOrError.unwrap()[0];
            const inputCreateAppointment = new CreateAppointmentInput(
            new Date(event.startDateTime),
                new Date(event.endDateTime),
                100,
                professional.id,
                client.id,
                Status.CONFIRMED,
                PaymentStatus.PENDING);


            const appointmentOutputOrError = await createAppointmentUseCase.execute(inputCreateAppointment);
            if (appointmentOutputOrError.err) {
                this.addError(event.clientName);
                console.log('Erro ao salvar agendamento ' + appointmentOutputOrError.err);
                continue;
            }
            const appointmentOutput = appointmentOutputOrError.unwrap();

            appointments.push(Appointment.create(appointmentOutput.id,
                appointmentOutput.startDate,
                appointmentOutput.endDate,
                appointmentOutput.price,
                professional,
                client,
                appointmentOutput.status,
                appointmentOutput.paymentStatus).unwrap());
        }

        return appointments;

    }

    private async sendWhatsAppNotifications(appointments: Appointment[]): Promise<Appointment[]> {
        const successfulAppointments: Appointment[] = [];
        const whatsAppService = this.factoryService.getWhatsAppNotificationService();
        const sendWhatsUseCase = new SendWhatsAppNotificationUseCase(this.factoryRepository, whatsAppService);

        for (const appointment of appointments) {
            const input: WhatsAppNotificationInput =  {appointmentId: appointment.id, professionalId: appointment.getProfessionalId(),   clientId: appointment.client.id}
            const sendOrError = await sendWhatsUseCase.execute(input);
            if (sendOrError.err) {
                this.addError(appointment.client.firstName);
                console.log('Erro ao enviar notificação ' + sendOrError.err);
                continue;
            }
            successfulAppointments.push(appointment);

        }
        return successfulAppointments;
    }

    private extractClientName(event: FindEventsProfessionalOutput): string {
        const regex = /\| (.+?) <>/;
        const name = event.clientName.match(regex);
        if (name) return name[1].trim();
    }
}