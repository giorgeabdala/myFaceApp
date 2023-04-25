import GoogleCalendarService from "../service/googleCalendar/GoogleCalendarService";
import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";
import IWhatsAppNotificationService from "../../domain/adapters/IWhatsAppNotificationService";
import WhatsAppNotificationServiceCodeChat from "../service/whatsApp/whatsAppNotificationServiceCodeChat";


export default class ServiceFactory {

     getGoogleCalendarService(): IGoogleCalendarService {
        return  new GoogleCalendarService();
    }

     getWhatsAppNotificationService(): IWhatsAppNotificationService {
        return new WhatsAppNotificationServiceCodeChat();
    }


}