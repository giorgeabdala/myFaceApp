import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import { Ok, Err, Result } from 'ts-results';
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import IClientRepository from "../../domain/adapters/IClientRepository";
import IWhatsAppNotificationService from "../../domain/adapters/IWhatsAppNotificationService";
import dayjs from 'dayjs';

export type sendWhatsAppNotificationInput = {
    appointmentId: string,
    professionalId: string,
    clientId: string
}

export type sendWhatsAppNotificationOutput = {
    result: boolean,
    msg: string
}
const MSG = 'Notificação enviada com sucesso';

export default class sendWhatsAppNotification {

    constructor(readonly appointmentRepository: IAppointmentRepository, readonly professionalRepository: IProfessionalRepository, readonly clientRepository: IClientRepository, readonly notification: IWhatsAppNotificationService) {}

    public async execute(input: sendWhatsAppNotificationInput): Promise<Result<sendWhatsAppNotificationOutput,string>> {
        const appointment = await this.appointmentRepository.findById(input.appointmentId);
        const professional = await this.professionalRepository.findById(input.professionalId);
        const client = await this.clientRepository.findById(input.clientId);
        if (!appointment) return new Err('Não foi possível enviar a notificação. Agendamento não encontrado');
        if (!professional) return new Err('Não foi possível enviar a notificação. Profissional não encontrado');
        if (!client) return new Err('Não foi possível enviar a notificação. Cliente não encontrado');

        const appointmentDate = dayjs(appointment.startDate).format('DD/MM/YYYY');
        const appointmentHour = dayjs(appointment.startDate).format('HH:mm');
        const send = await this.notification.send(client.cellPhone.DDD, client.cellPhone.number, client.name, appointmentDate, appointmentHour);

        if (send.err) return new Err('Não foi possível enviar a notificação. ' + send.err);
        return Ok<sendWhatsAppNotificationOutput>({result: true, msg: MSG});
    }

}