import {Result} from "ts-results";

export default interface IWhatsAppNotificationService {

    send(DDD: string, number: string, message: string): Promise<Result<Response, Response>>;
    buildMessage(clientName: string, appointmentDate: string, appointmentHour: string): string;

}
