import {Result} from "ts-results";

export default interface IWhatsAppNotificationService {

    send(DDD: string, number: string, clientName: string, appointmentDate: string, appointmentHour: string): Promise<Result<Response, Response>>;

}
