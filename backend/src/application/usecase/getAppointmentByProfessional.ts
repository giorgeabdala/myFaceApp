import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import {Status} from "../../domain/entities/appointment";
import { Ok, Result } from 'ts-results';
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";

type getAppointmentOutput = {
    id: string,
    startDate: Date,
    endDate: Date,
    price: number,
    professionalId: string,
    clientId: string,
    status: Status
}

export default class GetAppointmentByProfessional {
    private  appointmentRepository: IAppointmentRepository;


    constructor(readonly factoryRepository: IRepositoryFactory) {
        this.appointmentRepository = factoryRepository.createAppointmentsRepository();
    }

    public async execute(professionalId: string): Promise<Result<getAppointmentOutput[], string>> {
        const appointments = await this.appointmentRepository.findByProfessionalId(professionalId);
        const appointmentsOutput: getAppointmentOutput[] = [];
        if (!appointments) return Ok<getAppointmentOutput[]>(appointmentsOutput);

        appointments.forEach(appointment => {
            appointmentsOutput.push({
                id: appointment.id,
                startDate: appointment.startDate,
                endDate: appointment.endDate,
                price: appointment.price,
                professionalId: appointment.getProfessionalId(),
                clientId: appointment.getClientId(),
                status: appointment.status
            });
        });

        return Ok(appointmentsOutput);


    }
}