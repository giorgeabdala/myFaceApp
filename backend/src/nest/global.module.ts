import FactoryBuilder from "../infra/factory/FactoryBuilder";
import ServiceFactory from "../infra/factory/ServiceFactory";


export const repositoryFactory = {
    provide: 'IRepositoryFactory',
    useValue: FactoryBuilder.getDefaultFactoryRepository()
}

export const repositoryFactoryTest = {
    provide: 'IRepositoryFactory',
    useValue: FactoryBuilder.getTestsRepositoryFactory()
}

export const googleCalendarService  = {
    provide: 'IGoogleCalendarService',
    useValue: new ServiceFactory().getGoogleCalendarService()
}

export const whatsService = {
    provide: 'IWhatsAppNotificationService',
    useValue: new ServiceFactory().getWhatsAppNotificationService()
}

export const serviceFactory = {
    provide: 'ServiceFactory',
    useValue: new ServiceFactory()
}