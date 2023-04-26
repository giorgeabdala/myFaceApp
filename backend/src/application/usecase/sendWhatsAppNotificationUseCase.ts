import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import { Ok, Err, Result } from 'ts-results';
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import IClientRepository from "../../domain/adapters/IClientRepository";
import IWhatsAppNotificationService from "../../domain/adapters/IWhatsAppNotificationService";
import dayjs from 'dayjs';
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";

export type WhatsAppNotificationInput = {
    appointmentId: string,
    professionalId: string,
    clientId: string
}

export type WhatsAppNotificationOutput = {
    result: boolean,
    msg: string
}
const MSG = 'Notificação enviada com sucesso';

export default class SendWhatsAppNotificationUseCase {
    private  appointmentRepository: IAppointmentRepository;
    private  professionalRepository: IProfessionalRepository;
    private  clientRepository: IClientRepository;

    constructor(readonly factoryRepository: IRepositoryFactory, readonly notification: IWhatsAppNotificationService) {
        this.appointmentRepository = factoryRepository.getAppointmentsRepository();
        this.professionalRepository = factoryRepository.getProfessionalRepository();
        this.clientRepository = factoryRepository.getClientRepository();
    }

    public async execute(input: WhatsAppNotificationInput): Promise<Result<WhatsAppNotificationOutput,string>> {
        const appointment = await this.appointmentRepository.findById(input.appointmentId);
        if (!appointment) return new Err('Não foi possível enviar a notificação. Agendamento não encontrado');
        const client = appointment.client;
        const appointmentDate = dayjs(appointment.startDate).format('DD/MM/YYYY');
        const appointmentHour = dayjs(appointment.startDate).format('HH:mm');
        const message = this.buildMessage(client.firstName, appointmentDate, appointmentHour);
        const send = await this.notification.send(client.cellPhone.DDD, client.cellPhone.phone, message);

        if (send.err) return new Err('Não foi possível enviar a notificação. ' + send.err);
        return Ok<WhatsAppNotificationOutput>({result: true, msg: MSG});
    }

    //marcado como publico para poder testar
    public buildMessage(clientName: string, appointmentDate: string, appointmentHour: string): string {
        return `Oi ${clientName}
Tudo bem?
Passando para lembrar que *Amanhã, ${appointmentDate} as ${appointmentHour}hrs* você tem um horário agendado para extensão de cílios.
Rua Rio Xingu, 625 - Sobrado 8 Bairro Alto.
            
Por gentileza, confirme sua presença.`;
    }

}