import CreateAppointmentUseCase from "../../src/application/usecase/createAppointmentUseCase";
import {CreateAppointmentInput} from "../../src/application/dto/createAppointmentDTO";
import {PaymentStatus, Status} from "../../src/domain/entities/appointment";
import { validate as uuidValidate } from 'uuid';
import {IAppointmentRepository} from "../../src/domain/adapters/IAppointmentRepository";
import {UpdateAppointmentInput} from "../../src/application/dto/updateAppointmentDTO";
import UpdateAppointmentUseCase from "../../src/application/usecase/updateAppointmentUseCase";
import getAppointmentByClient from "../../src/application/usecase/findAppointmentByClient";
import FindAppointmentByProfessionalUseCase from "../../src/application/usecase/findAppointmentByProfessionalUseCase";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let factoryRepository: IRepositoryFactory;
let startDate: Date;
let endDate: Date;
let createInput: CreateAppointmentInput;
let appointmentRepository: IAppointmentRepository;

beforeEach(() => {

    startDate = new Date(); // data atual
    endDate = new Date(new Date().getTime() + (60 * 60 * 1000));
    factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();
    appointmentRepository = factoryRepository.getAppointmentsRepository();

    createInput = new CreateAppointmentInput(
        startDate,
        endDate,
        99.99,
        '1',
        '1',
        Status.CONFIRMED,
           PaymentStatus.PAID

    );

} );


describe('Deve testar os casos de uso de CRUD em agendamentos', () => {
    it('Deve criar um agendamento iniciando agora e com termino em 1 hora', async () => {
        const useCase = new CreateAppointmentUseCase(factoryRepository);
        const outputOrError = await useCase.execute(createInput);
        expect(outputOrError.ok).toBeTruthy();
        const output = outputOrError.unwrap();
        expect(uuidValidate(output.id)).toBeTruthy();

        const appointment = await appointmentRepository.findById (output.id);
        expect(appointment.id).toBeTruthy();
        expect(appointment.startDate).toBe(createInput.startDate);
        expect(appointment.endDate).toBe(createInput.endDate);
        expect(appointment.price).toBe(createInput.price);
        expect(appointment.getProfessionalId()).toBe(createInput.professionalId);
        expect(appointment.getClientId()).toBe(createInput.clientId);
        expect(appointment.status).toBe(createInput.status);
        expect(appointment.paymentStatus).toBe(createInput.paymentStatus);
    });

    it('Deve criar um Agendamento e depois  atualizar o valor, o horário e os status de um agendamento e pagamento', async () => {
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
        const useCase = new UpdateAppointmentUseCase(factoryRepository);
        const outputOrError = await useCase.execute(updateInput);
        expect(outputOrError.ok).toBeTruthy();
        const appointment = await appointmentRepository.findById (createOutput.id);
        expect(appointment.id).toBe(updateInput.id);
        expect(appointment.startDate).toBe(updateInput.startDate);
        expect(appointment.endDate).toBe(updateInput.endDate);
        expect(appointment.price).toBe(updateInput.price);
        expect(appointment.getProfessionalId()).toBe(updateInput.professionalId);
        expect(appointment.getClientId()).toBe(updateInput.clientId);
        expect(appointment.status).toBe(updateInput.status);
        expect(appointment.paymentStatus).toBe(updateInput.paymentStatus);

    });

    it('Deve buscar os agendamentos de um cliente específico', async () => {
        const useCase = new getAppointmentByClient(factoryRepository);
        const outputOrError = await useCase.execute('1');
        expect(outputOrError.ok).toBeTruthy();
        const output = outputOrError.unwrap();
        expect(output.length).toBe(2);
        expect(output[0].clientId).toBe('1');
        expect(output[1].clientId).toBe('1');
        });

    it ('Deve buscar os agendamentos de um profissional específico', async () => {
        const useCase = new FindAppointmentByProfessionalUseCase(factoryRepository);
        const outputOrError = await useCase.execute('2');
        expect(outputOrError.ok).toBeTruthy();
        const output = outputOrError.unwrap();
        expect(output.length).toBe(2);
        expect(output[0].professionalId).toBe('2');
        expect(output[1].professionalId).toBe('2');
    });

});