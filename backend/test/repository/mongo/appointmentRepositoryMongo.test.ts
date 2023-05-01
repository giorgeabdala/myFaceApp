import 'dotenv/config';
import AppointmentRepositoryMongo from "../../../src/infra/repository/mongo/AppointmentRepositoryMongo";
import IRepositoryFactory from "../../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../../src/infra/factory/FactoryBuilder";
import {IAppointmentRepository} from "../../../src/domain/adapters/IAppointmentRepository";
import {beforeAll} from "vitest";
import {Appointment, Status} from "../../../src/domain/entities/appointment";
import {IProfessionalRepository} from "../../../src/domain/adapters/IProfessionalRepository";
import IClientRepository from "../../../src/domain/adapters/IClientRepository";
import {
    appointmentFake,
    appointmentFake2, clientFake,
    clientFake2,
    professionalFake,
    professionalFake2
} from "test/dataFake/dateFake";

let factoryRepository: IRepositoryFactory;
let appointmentRepositoryMongo: IAppointmentRepository;
let clientRepositoryMongo: IClientRepository;
let professionalRepositoryMongo: IProfessionalRepository;

beforeAll(async () => {
    factoryRepository = FactoryBuilder.getMongoRepositoryFactory();
    appointmentRepositoryMongo = factoryRepository.getAppointmentsRepository();
    clientRepositoryMongo = factoryRepository.getClientRepository();
    professionalRepositoryMongo = factoryRepository.getProfessionalRepository();
} );


describe('AppointmentRepositoryMongo', () => {

    it('Deve salvar um agendamento', async () => {
        await clientRepositoryMongo.save(clientFake);
        await professionalRepositoryMongo.save(professionalFake);
        await appointmentRepositoryMongo.save(appointmentFake);
        const appointment = await appointmentRepositoryMongo.findById(appointmentFake.id);
        expect(appointment).toEqual(appointmentFake);
        await appointmentRepositoryMongo.delete(appointmentFake);
    });

    it('Deve deletar um agendamento', async () => {
        await clientRepositoryMongo.save(clientFake);
        await professionalRepositoryMongo.save(professionalFake);
        await appointmentRepositoryMongo.save(appointmentFake);
        await appointmentRepositoryMongo.delete(appointmentFake);
        const appointment = await appointmentRepositoryMongo.findById(appointmentFake.id);
        expect(appointment).toBeNull();
    }   );

    it('Deve retornar um agendamento pelo id', async () => {
        await clientRepositoryMongo.save(clientFake);
        await professionalRepositoryMongo.save(professionalFake);
        await appointmentRepositoryMongo.save(appointmentFake);
        const appointment = await appointmentRepositoryMongo.findById(appointmentFake.id);
        expect(appointment).toEqual(appointmentFake);
        await appointmentRepositoryMongo.delete(appointmentFake);
    }  );

    it('Deve retornar todos os agendamentos pelo id do profissional', async () => {
        await clientRepositoryMongo.save(clientFake);
        await clientRepositoryMongo.save(clientFake2);
        await professionalRepositoryMongo.save(professionalFake);
        await professionalRepositoryMongo.save(professionalFake2);
        await appointmentRepositoryMongo.save(appointmentFake);
        await appointmentRepositoryMongo.save(appointmentFake2);
        const appointments = await appointmentRepositoryMongo.findByProfessionalId(appointmentFake.getProfessionalId());
        expect(appointments.length).toBeGreaterThanOrEqual(1);

        await appointmentRepositoryMongo.delete(appointmentFake);
        await appointmentRepositoryMongo.delete(appointmentFake2);
        await professionalRepositoryMongo.delete(professionalFake);
        await professionalRepositoryMongo.delete(professionalFake2);
        await clientRepositoryMongo.delete(clientFake);
        await clientRepositoryMongo.delete(clientFake2);
    } );

    it('Deve retornar os agendamento pelo id do cliente', async () => {
        await clientRepositoryMongo.save(clientFake);
        await clientRepositoryMongo.save(clientFake2);
        await professionalRepositoryMongo.save(professionalFake);
        await professionalRepositoryMongo.save(professionalFake2);
        await appointmentRepositoryMongo.save(appointmentFake);
        await appointmentRepositoryMongo.save(appointmentFake2);

        const appointments = await appointmentRepositoryMongo.findByClientId(appointmentFake.getClientId());
        expect(appointments.length).toBeGreaterThanOrEqual(1);

        await appointmentRepositoryMongo.delete(appointmentFake);
        await appointmentRepositoryMongo.delete(appointmentFake2);
        await clientRepositoryMongo.delete(clientFake);
        await clientRepositoryMongo.delete(clientFake2);
        await professionalRepositoryMongo.delete(professionalFake);
        await professionalRepositoryMongo.delete(professionalFake2);


    } );

    it('Deve atualizar um agendamento', async () => {
        await clientRepositoryMongo.save(clientFake);
        await professionalRepositoryMongo.save(professionalFake);
        await appointmentRepositoryMongo.save(appointmentFake);
        const startDate = new Date(); // data atual
        const endDate = new Date(new Date().getTime() + (60 * 60 * 1000));
        const updatedAppointment = Appointment.create(appointmentFake.id,
            startDate,
            endDate,
            100, professionalFake,
    clientFake, Status.CONFIRMED).unwrap();
       await appointmentRepositoryMongo.update(updatedAppointment);
       const appointment = await appointmentRepositoryMongo.findById(appointmentFake.id);
       expect(appointment).toEqual(updatedAppointment);

         await appointmentRepositoryMongo.delete(appointmentFake);
         await clientRepositoryMongo.delete(clientFake);
         await professionalRepositoryMongo.delete(professionalFake);
    } );

    } );

afterEach(async () => {
    await appointmentRepositoryMongo.delete(appointmentFake);
    await appointmentRepositoryMongo.delete(appointmentFake2);
    await clientRepositoryMongo.delete(clientFake);
    await clientRepositoryMongo.delete(clientFake2);
    await professionalRepositoryMongo.delete(professionalFake);
    await professionalRepositoryMongo.delete(professionalFake2);
} );
