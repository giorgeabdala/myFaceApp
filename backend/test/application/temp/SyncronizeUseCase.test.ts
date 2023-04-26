import SyncronizeUseCase, {SyncronizeInput} from "../../../src/application/usecase/temp/SyncronizeUseCase";
import ServiceFactory from "../../../src/infra/factory/ServiceFactory";
import FactoryBuilder from "../../../src/infra/factory/FactoryBuilder";
import IRepositoryFactory from "../../../src/domain/factory/IRepositoryFactory";
import {IProfessionalRepository} from "../../../src/domain/adapters/IProfessionalRepository";
import {IAppointmentRepository} from "../../../src/domain/adapters/IAppointmentRepository";
import IClientRepository from "../../../src/domain/adapters/IClientRepository";
import {clientFake, professionalFake} from "../../dataFake/dateFake";
import {Appointment} from "../../../src/domain/entities/appointment";
import {beforeAll} from "vitest";

//o mé é indexado começando cm 0. 26/02/2023
const date = new Date(2023, 1, 26);
const input = new SyncronizeInput('10', date.toDateString());

let factoryService: ServiceFactory;
let factoryRepository: IRepositoryFactory;
let clientRepository: IClientRepository;
let professionalRepository: IProfessionalRepository;
let appointmentRepository: IAppointmentRepository;
let notificationsForDelete: Appointment[] = [];


beforeAll(async () => {
    factoryService = new ServiceFactory();
    factoryRepository = FactoryBuilder.getMongoRepositoryFactory();
    clientRepository = factoryRepository.getClientRepository();
    professionalRepository = factoryRepository.getProfessionalRepository();
    appointmentRepository = factoryRepository.getAppointmentsRepository();
    await clientRepository.save(clientFake);
    await professionalRepository.save(professionalFake);
} );


describe('\'deve testar a sincronização dos dados.\' +\n' +
    '    \' Busca os eventos no google calendar, salva os appointments no banco, e envia uma notificação para o cliente\'', () => {
        it('\'deve sincronizar os dados\'', async () => {
            const useCase = new SyncronizeUseCase(factoryRepository, factoryService);
            const notificationsOrError = await useCase.execute(input);
            expect(notificationsOrError.ok).toBe(true);
            const notifications = notificationsOrError.unwrap();
            expect(notifications.success).toBeInstanceOf(Array);
            expect(notifications.errors.names).toBeInstanceOf(Array);
            expect(notifications.success.length).toBeGreaterThan(0);
            expect(notifications.errors.quantity).toBe(2);
            notificationsForDelete = notifications.success;
        } );
}  );


afterAll(async () => {
    for (const notification of notificationsForDelete) {
        await appointmentRepository.delete(notification);
    }
    await professionalRepository.delete(professionalFake);
    await clientRepository.delete(clientFake);
} );