import {Test, TestingModule} from '@nestjs/testing';
import {AppointmentController} from '../../src/controller/appointment.controller';
import {CreateAppointmentInput, CreateAppointmentOutput} from "../../src/application/dto/createAppointmentDTO";
import {PaymentStatus, Status} from "../../src/domain/entities/appointment";
import CreateAppointmentUseCase from "../../src/application/usecase/createAppointmentUseCase";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import {UpdateAppointmentInput, UpdateAppointmentOutput} from "../../src/application/dto/updateAppointmentDTO";
import UpdateAppointmentUseCase from "../../src/application/usecase/updateAppointmentUseCase";
import {AppointmentModule} from "../../src/nest/appointment.module";

describe('AppointmentController', () => {
    let factoryRepository: IRepositoryFactory;
    let controller: AppointmentController;
    let createInput: CreateAppointmentInput;
    let startDate: Date;
    let endDate: Date;

  beforeEach(async () => {
      factoryRepository = FactoryBuilder.getFactoryRepository();
      startDate = new Date(); // data atual
      endDate = new Date(new Date().getTime() + (60 * 60 * 1000));
      createInput = new CreateAppointmentInput(
          startDate,
          endDate,
          99.99,
          '1',
          '1',
          Status.CONFIRMED,
          PaymentStatus.PAID

      );

        const module: TestingModule = await Test.createTestingModule({
        imports: [AppointmentModule]
     }).compile();
        controller = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    it('Deve criar um agendamento', async () => {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 1000 * 60 * 60);
        const output = await controller.create(createInput);
        expect(output.success).toBe(true);
        expect(output.body).toBeInstanceOf(CreateAppointmentOutput);

});

    it('Deve retornar um badRequest ao criar um agendamento inválido', async () => {
        const endDate = new Date() ; //enddate menor que startdate
        const startDate = new Date();
        const input: CreateAppointmentInput = {
            startDate: startDate,
            endDate: endDate,
            clientId: "1",
            professionalId: "1",
            price: 100,
            status: Status.PENDING,
            paymentStatus: PaymentStatus.PENDING
        }
        const output = await controller.create(input);
        expect(output.success).toBe(false);

    } );

    it ('Deve buscar todos os appointments de um cliente', async () => {
        const output = await controller.findByClient("1");
        expect(output.success).toBe(true);
        expect(output.body).toBeInstanceOf(Array<CreateAppointmentOutput>);
    });

    it ('Deve buscar todos os appointments de um profissional', async () => {
        const output = await controller.findByProfessional("1");
        expect(output.success).toBe(true);
        expect(output.body).toBeInstanceOf(Array<CreateAppointmentOutput>);
    } );

    it ('Deve  criar e atualizar um agendamento', async () => {
        const createUseCase = new CreateAppointmentUseCase(factoryRepository);
        const createOutput = (await createUseCase.execute(createInput)).unwrap();

        const updateStartDate = new Date(new Date().getTime() + (60 * 60 * 1000));
        const updateEndDate = new Date(new Date().getTime() + (2 * 60 * 60 * 1000));
        const updatePrice = 199.94;

        const updateInput = new UpdateAppointmentInput(
            createOutput.id,
            updateStartDate,
            updateEndDate,
            updatePrice,
            createOutput.professionalId,
            createOutput.clientId,
            Status.CANCELED,
            PaymentStatus.PENDING
        );

        controller = new AppointmentController(factoryRepository);
       const output = await controller.update(updateInput);
         expect(output.success).toBe(true);
            expect(output.body).toBeInstanceOf(UpdateAppointmentOutput);

    } );

    it ('Deve deletar um agendamento', async () => {
        const createUseCase = new CreateAppointmentUseCase(factoryRepository);
        const createOutput = (await createUseCase.execute(createInput)).unwrap();
        const output = await controller.delete(createOutput.id);
        expect(output.success).toBe(true);
    } );

});
