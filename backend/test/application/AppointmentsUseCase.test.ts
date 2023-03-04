import jest from 'jest';
import CreateAppointmentUseCase from "../../src/application/usecase/createAppointmentUseCase";
import {CreateAppointmentInput} from "../../src/application/dto/createAppointmentDTO";
import {Status} from "../../src/domain/entities/appointment";
import { validate as uuidValidate } from 'uuid';
import {IAppointmentRepository} from "../../src/domain/adapters/IAppointmentRepository";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import IClientRepository from "../../src/domain/adapters/IClientRepository";
import AppointmentRepositoryMemory from "../../src/infra/repository/memory/AppointmentRepositoryMemory";
import ClientRepositoryMemory from "../../src/infra/repository/memory/ClientRepositoryMemory";
import ProfessionalRepositoryMemory from "../../src/infra/repository/memory/ProfessionalRepositoryMemory";

let startDate: Date;
let endDate: Date;
let appointmentRepository: IAppointmentRepository;
let professionalRepository: IProfessionalRepository;
let clientRepository: IClientRepository;

beforeEach(() => {
    startDate = new Date(); // data atual
    endDate = new Date(new Date().getTime() + (60 * 60 * 1000));
    appointmentRepository = new AppointmentRepositoryMemory();
    professionalRepository = new ProfessionalRepositoryMemory();
    clientRepository = new ClientRepositoryMemory();
} );


describe('Deve testar o caso de uso para criação de agendamentos', () => {
    it('Deve criar um agendamento iniciando agora e com termino em 1 hora', async () => {

        const input = new CreateAppointmentInput(
            startDate,
            endDate,
            99.99,
            '1',
            '1',
            Status.CONFIRMED
        );

        const useCase = new CreateAppointmentUseCase(appointmentRepository, professionalRepository, clientRepository);
        const outputOrError = await useCase.execute(input);
        expect(outputOrError.isSuccess).toBeTruthy();
        const output = outputOrError.getValue();
        expect(output.id).toBeTruthy();
        expect(uuidValidate(output.id)).toBeTruthy();
        expect(output.startDate).toBe(input.startDate);
        expect(output.endDate).toBe(input.endDate);
        expect(output.price).toBe(input.price);
        expect(output.professionalId).toBe(input.professionalId);
        expect(output.clientId).toBe(input.clientId);
        expect(output.status).toBe(input.status);
    } );







    } );

