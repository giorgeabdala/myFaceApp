import FactoryBuilder from "../infra/factory/FactoryBuilder";
import ServiceFactory from "../infra/factory/ServiceFactory";


export const repositoryFactory = {
    provide: 'IRepositoryFactory',
    useValue: FactoryBuilder.getFactoryRepository()
}

export const googleCalendarService  = {
    provide: 'IGoogleCalendarService',
    useValue: ServiceFactory.getGoogleCalendarService()
}

export const whatsService = {
    provide: 'IWhatsAppNotificationService',
    useValue: ServiceFactory.getWhatsAppNotificationService()
}