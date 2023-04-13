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
        const professional = await this.professionalRepository.findById(input.professionalId);
        const client = await this.clientRepository.findById(input.clientId);
        if (!appointment) return new Err('Não foi possível enviar a notificação. Agendamento não encontrado');
        if (!professional) return new Err('Não foi possível enviar a notificação. Profissional não encontrado');
        if (!client) return new Err('Não foi possível enviar a notificação. Cliente não encontrado');

        const appointmentDate = dayjs(appointment.startDate).format('DD/MM/YYYY');
        const appointmentHour = dayjs(appointment.startDate).format('HH:mm');
        const message = this.notification.buildMessage(client.firstName, appointmentDate, appointmentHour);
        const send = await this.notification.send(client.cellPhone.DDD, client.cellPhone.phone, message);

        if (send.err) return new Err('Não foi possível enviar a notificação. ' + send.err);
        return Ok<WhatsAppNotificationOutput>({result: true, msg: MSG});
    }

}