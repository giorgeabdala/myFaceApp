import { IAppointmentRepository } from '../../domain/adapters/IAppointmentRepository';
import {CreateAppointmentInput, CreateAppointmentOutput} from "../dto/createAppointmentDTO";
import { Ok, Err, Result } from 'ts-results';
import {Appointment} from "../../domain/entities/appointment";
import { v4 as uuidv4 } from 'uuid';
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import IClientRepository from "../../domain/adapters/IClientRepository";


export default class CreateAppointment {
    constructor(readonly appointmentRepository: IAppointmentRepository, readonly professionalRepository: IProfessionalRepository, readonly clientRepository: IClientRepository) {}

    public async execute(input: CreateAppointmentInput): Promise<Result<CreateAppointmentOutput, string>> {
        const id = uuidv4();
        const professional = await this.professionalRepository.findById(input.professionalId);
        const client = await this.clientRepository.findById(input.clientId);
        if (!id) return new Err('Erro ao criar ID de agendamento');
        if (!professional) return new Err('Erro ao criar agendamento. Profissional não encontrado');
        if (!client) return new Err('Erro ao criar agendamento. Cliente não encontrado');
        const appointmentOrError = Appointment.create(id,input.startDate, input.endDate, input.price, professional, client, input.status);
        if (appointmentOrError.err) return new Err('Erro ao criar agendamento ' + appointmentOrError.err);
        await this.appointmentRepository.save(appointmentOrError.unwrap());
        const output = new CreateAppointmentOutput(id, input.startDate, input.endDate, input.price, input.professionalId, input.clientId, input.status);
        if (!output) return new Err('Erro ao criar agendamento. Output não gerado');
        return Ok<CreateAppointmentOutput>(output);
    }
}