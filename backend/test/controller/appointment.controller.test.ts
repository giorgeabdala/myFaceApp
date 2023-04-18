import {Test, TestingModule} from '@nestjs/testing';
import {AppointmentController} from '../../src/controller/appointment.controller';
import {CreateAppointmentInput, CreateAppointmentOutput} from "../../src/application/dto/createAppointmentDTO";
import CreateAppointmentUseCase from "../../src/application/usecase/createAppointmentUseCase";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import {UpdateAppointmentOutput} from "../../src/application/dto/updateAppointmentDTO";
import {AppointmentModuleTest} from "../../src/nest/appointment.module";
import DeleteAppointmentUseCase from "../../src/application/usecase/deleteAppointmentUseCase";
import {CreateProfessionalUseCase} from "../../src/application/usecase/createProfessionalUseCase";
import CreateClientUseCase from "../../src/application/usecase/createClientUseCase";
import DeleteClientUseCase from "../../src/application/usecase/deleteClientUseCase";
import DeleteProfessionalUseCase from "../../src/application/usecase/deleteProfessionalUseCase";
import {appointmentFakeController, clientFakeController} from "../dataFake/dataFakeController";

describe('AppointmentController', () => {
    let factoryRepository: IRepositoryFactory;
    let controller: AppointmentController;
    let startDate: Date;
    let endDate: Date;

  beforeEach(async () => {
      factoryRepository = FactoryBuilder.getTestsRepositoryFactory();
        const module: TestingModule = await Test.createTestingModule({
        imports: [AppointmentModuleTest]
     }).compile();
        controller = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    it('Deve criar um agendamento', async () => {
        const clientUseCase = new CreateClientUseCase(factoryRepository);
        const professionalUseCase = new CreateProfessionalUseCase(factoryRepository);
        const client = (await clientUseCase.execute(clientFakeController)).unwrap();
        const professional = (await professionalUseCase.execute(clientFakeController)).unwrap();
        const appointmentFake = {...appointmentFakeController, clientId: client.id, professionalId: professional.id};
        const output = await controller.create(appointmentFake);
        expect(output.success).toBe(true);
        expect(output.body).toBeInstanceOf(CreateAppointmentOutput);

        const deleteAppointmentUseCase = new DeleteAppointmentUseCase(factoryRepository);
        const deleteClientUseCase = new DeleteClientUseCase(factoryRepository);
        const deleteProfessionalUseCase = new DeleteProfessionalUseCase(factoryRepository);
        await deleteAppointmentUseCase.execute(output.body.id);
        await deleteClientUseCase.execute(client.id);
        await deleteProfessionalUseCase.execute(professional.id);

});

    it('Deve retornar um badRequest ao criar um agendamento inválido', async () => {
        const endDate = new Date() ; //enddate menor que startdate
        const startDate = new Date();
        const newInput: CreateAppointmentInput = {...appointmentFakeController, startDate, endDate}
        await expect(controller.create(newInput)).rejects.toThrowError();
    } );

    it ('Deve buscar todos os appointments de um cliente', async () => {
        //testado com repo em memória. id = 1
        const output = await controller.findByClient("1");
        expect(output.success).toBe(true);
        expect(output.body).toBeInstanceOf(Array<CreateAppointmentOutput>);
    });

    it ('Deve buscar todos os appointments de um profissional', async () => {
        //testado com repo em memória. id = 1
        const output = await controller.findByProfessional("1");
        expect(output.success).toBe(true);
        expect(output.body).toBeInstanceOf(Array<CreateAppointmentOutput>);
    } );

    it ('Deve  criar e atualizar um agendamento', async () => {
        const clientUseCase = new CreateClientUseCase(factoryRepository);
        const professionalUseCase = new CreateProfessionalUseCase(factoryRepository);
        const appointmentUseCase = new CreateAppointmentUseCase(factoryRepository);

        const client = (await clientUseCase.execute(clientFakeController)).unwrap();
        const professional = (await professionalUseCase.execute(clientFakeController)).unwrap();
        const appointmentFake = {...appointmentFakeController, clientId: client.id, professionalId: professional.id};
        const appointment = (await appointmentUseCase.execute(appointmentFake)).unwrap();

        const updateStartDate = new Date(new Date().getTime() + (60 * 60 * 1000));
        const updateEndDate = new Date(new Date().getTime() + (2 * 60 * 60 * 1000));
        const updatePrice = 199.94;

        const updateInput = {
            ...appointment,
            startDate: updateStartDate, endDate: updateEndDate, price: updatePrice, clientId: client.id, professionalId: professional.id};

        controller = new AppointmentController(factoryRepository);
        const output = await controller.update(updateInput);
        expect(output.success).toBe(true);
        expect(output.body).toBeInstanceOf(UpdateAppointmentOutput);

        const clientDeleteUseCase = new DeleteClientUseCase(factoryRepository);
        const professionalDeleteUseCase = new DeleteProfessionalUseCase(factoryRepository);
        const appointmentDeleteUseCase = new DeleteAppointmentUseCase(factoryRepository);
        await appointmentDeleteUseCase.execute(output.body.id);
        await clientDeleteUseCase.execute(client.id);
        await professionalDeleteUseCase.execute(professional.id);

    } );

    it ('Deve criar e deletar um agendamento', async () => {
        const clientUseCase = new CreateClientUseCase(factoryRepository);
        const professionalUseCase = new CreateProfessionalUseCase(factoryRepository);
        const client = (await clientUseCase.execute(clientFakeController)).unwrap();
        const professional = (await professionalUseCase.execute(clientFakeController)).unwrap();
        const appointmentFake = {...appointmentFakeController, clientId: client.id, professionalId: professional.id};
        const appointmentUseCase = new CreateAppointmentUseCase(factoryRepository);
        const newAppointment = (await appointmentUseCase.execute(appointmentFake)).unwrap();

        const output = await controller.delete(newAppointment.id);
        expect(output.success).toBe(true);

        const clientDeleteUseCase = new DeleteClientUseCase(factoryRepository);
        const professionalDeleteUseCase = new DeleteProfessionalUseCase(factoryRepository);
        await clientDeleteUseCase.execute(client.id);
        await professionalDeleteUseCase.execute(professional.id);
    } );



});


