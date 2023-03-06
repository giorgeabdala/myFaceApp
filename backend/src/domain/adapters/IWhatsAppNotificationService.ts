export default interface IWhatsAppNotificationService {

    send(DDD: string, number: string, message: string): Promise<void>;


}