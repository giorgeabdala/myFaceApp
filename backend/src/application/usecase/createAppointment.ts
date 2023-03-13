import { IAppointmentRepository } from '../../domain/adapters/IAppointmentRepository';
import {CreateAppointmentInput, CreateAppointmentOutput} from "../dto/createAppointmentDTO";
import { Ok, Err, Result } from 'ts-results';
import {Appointment} from "../../domain/entities/appointment";
import { v4 as uuidv4 } from 'uuid';
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import IClientRepository from "../../domain/adapters/IClientRepository";
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";


export default class CreateAppointment {
    private professionalRepository: IProfessionalRepository;
    private clientRepository: IClientRepository;
    private appointmentRepository: IAppointmentRepository;


     constructor(readonly factoryRepository: IRepositoryFactory) {
        this.professionalRepository = factoryRepository.createProfessionalRepository();
        this.clientRepository = factoryRepository.createClientRepository();
        this.appointmentRepository = factoryRepository.createAppointmentsRepository();
     }


    public async execute(input: CreateAppointmentInput): Promise<Result<CreateAppointmentOutput, string>> {
        const id = uuidv4();
        const professional = await this.professionalRepository.findById(input.professionalId);
        const client = await this.clientRepository.findById(input.clientId);
        if (!id) return new Err('Erro ao criar ID de agendamento');
        if (!professional) return new Err('Erro ao criar agendamento. Profissional não encontrado');
        if (!client) return new Err('Erro ao criar agendamento. Cliente não encontrado');
        const appointmentOrError = Appointment.create(id,
            input.startDate,
            input.endDate,
            input.price,
            professional,
            client,
            input.status,
            input.paymentStatus);
        if (appointmentOrError.err) return new Err('Erro ao criar agendamento ' + appointmentOrError.err);
        const appointment = appointmentOrError.unwrap();

        await this.appointmentRepository.save(appointment);
        const output = new CreateAppointmentOutput(id,
            appointment.startDate,
            appointment.endDate,
            appointment.price,
            appointment.getProfessionalId(),
            appointment.getClientId(),
            appointment.status,
            appointment.paymentStatus);
        if (!output) return new Err('Erro ao criar agendamento. Output não gerado');
        return Ok<CreateAppointmentOutput>(output);
    }
}