import CreateAppointment from "../../src/application/usecase/createAppointment";
import {CreateAppointmentInput} from "../../src/application/dto/createAppointmentDTO";
import {Status} from "../../src/domain/entities/appointment";
import { validate as uuidValidate } from 'uuid';
import {IAppointmentRepository} from "../../src/domain/adapters/IAppointmentRepository";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import IClientRepository from "../../src/domain/adapters/IClientRepository";
import AppointmentRepositoryMemory from "../../src/infra/repository/memory/AppointmentRepositoryMemory";
import ClientRepositoryMemory from "../../src/infra/repository/memory/ClientRepositoryMemory";
import ProfessionalRepositoryMemory from "../../src/infra/repository/memory/ProfessionalRepositoryMemory";
import {UpdateAppointmentInput} from "../../src/application/dto/updateAppointmentDTO";
import updateAppointment from "../../src/application/usecase/updateAppointment";
import getAppointmentByClient from "../../src/application/usecase/getAppointmentByClient";
import getAppointmentByProfessional from "../../src/application/usecase/getAppointmentByProfessional";

let startDate: Date;
let endDate: Date;
let appointmentRepository: IAppointmentRepository;
let professionalRepository: IProfessionalRepository;
let clientRepository: IClientRepository;
let createInput: CreateAppointmentInput;
let updateInput: UpdateAppointmentInput;

beforeEach(() => {
    startDate = new Date(); // data atual
    endDate = new Date(new Date().getTime() + (60 * 60 * 1000));
    appointmentRepository = new AppointmentRepositoryMemory();
    professionalRepository = new ProfessionalRepositoryMemory();
    clientRepository = new ClientRepositoryMemory();

    createInput = new CreateAppointmentInput(
        startDate,
        endDate,
        99.99,
        '1',
        '1',
        Status.CONFIRMED
    );

} );


describe('Deve testar os casos de uso de CRUD em agendamentos', () => {
    it('Deve criar um agendamento iniciando agora e com termino em 1 hora', async () => {
        const useCase = new CreateAppointment(appointmentRepository, professionalRepository, clientRepository);
        const outputOrError = await useCase.execute(createInput);
        expect(outputOrError.ok).toBeTruthy();
        const output = outputOrError.unwrap();
        expect(output.id).toBeTruthy();
        expect(uuidValidate(output.id)).toBeTruthy();
        expect(output.startDate).toBe(createInput.startDate);
        expect(output.endDate).toBe(createInput.endDate);
        expect(output.price).toBe(createInput.price);
        expect(output.professionalId).toBe(createInput.professionalId);
        expect(output.clientId).toBe(createInput.clientId);
        expect(output.status).toBe(createInput.status);
    });

    it('Deve criar um Agendamento e depois  atualizar o valor, o horário e o status de um agendamento', async () => {
        const createUseCase = new CreateAppointment(appointmentRepository, professionalRepository, clientRepository);
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
            Status.CANCELED
        );

        const useCase = new updateAppointment(appointmentRepository);
        const outputOrError = await useCase.execute(updateInput);
        expect(outputOrError.ok).toBeTruthy();
        const output = outputOrError.unwrap();
        expect(output.id).toBe(updateInput.id);
        expect(output.startDate).toBe(updateInput.startDate);
        expect(output.endDate).toBe(updateInput.endDate);
        expect(output.price).toBe(updateInput.price);
        expect(output.professionalId).toBe(updateInput.professionalId);
        expect(output.clientId).toBe(updateInput.clientId);
        expect(output.status).toBe(updateInput.status);

    });

    it('Deve buscar os agendamentos de um cliente específico', async () => {
        const useCase = new getAppointmentByClient(appointmentRepository);
        const outputOrError = await useCase.execute('1');
        expect(outputOrError.ok).toBeTruthy();
        const output = outputOrError.unwrap();
        expect(output.length).toBe(2);
        expect(output[0].clientId).toBe('1');
        expect(output[1].clientId).toBe('1');
        });

    it ('Deve buscar os agendamentos de um profissional específico', async () => {
        const useCase = new getAppointmentByProfessional(appointmentRepository);
        const outputOrError = await useCase.execute('2');
        expect(outputOrError.ok).toBeTruthy();
        const output = outputOrError.unwrap();
        expect(output.length).toBe(2);
        expect(output[0].professionalId).toBe('2');
        expect(output[1].professionalId).toBe('2');
    });

});