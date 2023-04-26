import { Test, TestingModule } from '@nestjs/testing';
import {SyncronizeInput} from "../../../src/application/usecase/temp/SyncronizeUseCase";
import FactoryBuilder from "../../../src/infra/factory/FactoryBuilder";
import {SyncronizeController} from "../../../src/controller/temp/syncronize.controller";
import {SyncronizeModuleTest} from "../../../src/nest/syncronize.module";
import {beforeAll} from "vitest";
import ServiceFactory from "../../../src/infra/factory/ServiceFactory";
import {clientFake, professionalFake} from "../../dataFake/dateFake";
import IRepositoryFactory from "../../../src/domain/factory/IRepositoryFactory";
import {IProfessionalRepository} from "../../../src/domain/adapters/IProfessionalRepository";
import {IAppointmentRepository} from "../../../src/domain/adapters/IAppointmentRepository";
import IClientRepository from "../../../src/domain/adapters/IClientRepository";
import {Appointment} from "../../../src/domain/entities/appointment";

let factoryService: ServiceFactory;
let factoryRepository: IRepositoryFactory;
let clientRepository: IClientRepository;
let professionalRepository: IProfessionalRepository;
let appointmentRepository: IAppointmentRepository;
let notificationsForDelete: Appointment[] = [];

describe('SyncronizeController', () => {
  let controller: SyncronizeController;
  const date = new Date(2023, 1, 26);
  const input = new SyncronizeInput('10', date.toDateString());

  beforeAll(async () => {
    factoryService = new ServiceFactory();
    factoryRepository = FactoryBuilder.getMongoRepositoryFactory();
     clientRepository = factoryRepository.getClientRepository();
    professionalRepository = factoryRepository.getProfessionalRepository();
    appointmentRepository = factoryRepository.getAppointmentsRepository();
    await clientRepository.save(clientFake);
    await professionalRepository.save(professionalFake);
  } );


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SyncronizeModuleTest],
    }).compile();

    controller = module.get<SyncronizeController>(SyncronizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve testar a sincronizacao dos dados da googlCalendar e o banco de dados', async () => {
    const output = await controller.run(input);
    expect(output.success).toBe(true);
    expect(output.body.success).toBeInstanceOf(Array);
    expect(output.body.errors.names).toBeInstanceOf(Array);
    expect(output.body.success.length).toBeGreaterThan(0);
    expect(output.body.errors.quantity).toBe(2);
    notificationsForDelete = output.body.success;

  } );

  afterAll(async () => {
    for (const notification of notificationsForDelete) {
      await appointmentRepository.delete(notification);
    }
    await professionalRepository.delete(professionalFake);
    await clientRepository.delete(clientFake);
  } );

});
