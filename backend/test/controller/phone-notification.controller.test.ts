import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNotificationController } from '../../src/controller/phone-notification.controller';
import {WhatsAppNotificationInput} from "../../src/application/usecase/sendWhatsAppNotificationUseCase";
import {PhoneNotificationModuleTest} from "../../src/nest/phone-notification.module";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import {appointmentFake, clientFake, professionalFake} from "../dataFake/dateFake";
import IClientRepository from "../../src/domain/adapters/IClientRepository";
import {IAppointmentRepository} from "../../src/domain/adapters/IAppointmentRepository";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";


describe('PhoneNotificationController', () => {
  let controller: PhoneNotificationController;
  let factoryRepository: IRepositoryFactory;
  let appointmentRepository: IAppointmentRepository;
  let clientRepository: IClientRepository;
  let professionalRepository: IProfessionalRepository;

  beforeEach(async () => {
    factoryRepository = FactoryBuilder.getTestsRepositoryFactory();
    appointmentRepository = factoryRepository.getAppointmentsRepository();
    clientRepository = factoryRepository.getClientRepository();
    professionalRepository = factoryRepository.getProfessionalRepository();

    const module: TestingModule = await Test.createTestingModule({
      imports: [PhoneNotificationModuleTest]
    }).compile();

    controller = module.get<PhoneNotificationController>(PhoneNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve enviar uma mensagem de whatsapp', async () => {
    const input : WhatsAppNotificationInput = {
      appointmentId: '2',
      professionalId: '10',
      clientId: '2'
    }
    await professionalRepository.save(professionalFake);
    await clientRepository.save(clientFake);
    await appointmentRepository.save(appointmentFake);
    const result = await controller.send(input);

    expect(result.statusCode).toBe(200);
    expect(result.success).toBe(true);

    await appointmentRepository.delete(appointmentFake);
    await professionalRepository.delete(professionalFake);
    await clientRepository.delete(clientFake);
  } );

  it('Deve gerar um erro ao enviar uma mensagem de whatsapp', async () => {
    const input : WhatsAppNotificationInput = {
      appointmentId: '99',
      professionalId: '99',
      clientId: '1'
    }
    await expect(controller.send(input)).rejects.toThrow();

    await appointmentRepository.delete(appointmentFake);
    await professionalRepository.delete(professionalFake);
    await clientRepository.delete(clientFake);

  } );

  afterEach(async () => {
    await appointmentRepository.delete(appointmentFake);
    await professionalRepository.delete(professionalFake);
    await clientRepository.delete(clientFake);

  } );
});
