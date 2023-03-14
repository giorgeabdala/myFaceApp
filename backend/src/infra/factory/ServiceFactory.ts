import GoogleCalendarService from "../service/googleCalendar/GoogleCalendarService";
import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";
import IWhatsAppNotificationService from "../../domain/adapters/IWhatsAppNotificationService";
import WhatsAppNotificationServiceOficial from "../service/WhatsAppNotificationServiceOficial";


export default class ServiceFactory {

    static getGoogleCalendarService(): IGoogleCalendarService {
        return  new GoogleCalendarService();
    }

    static getWhatsAppNotificationService(): IWhatsAppNotificationService {
        return new WhatsAppNotificationServiceOficial();
    }


}