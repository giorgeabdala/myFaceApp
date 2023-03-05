import { IAppointmentRepository } from '../../domain/adapters/IAppointmentRepository';
import {CreateAppointmentInput, CreateAppointmentOutput} from "../dto/createAppointmentDTO";
import {Result} from "../../utils/result";
import {Appointment} from "../../domain/entities/appointment";
import { v4 as uuidv4 } from 'uuid';
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import IClientRepository from "../../domain/adapters/IClientRepository";


export default class CreateAppointmentUseCase{
    constructor(readonly appointmentRepository: IAppointmentRepository, readonly professionalRepository: IProfessionalRepository, readonly clientRepository: IClientRepository) {}

    public async execute(input: CreateAppointmentInput): Promise<Result<CreateAppointmentOutput>> {
        const id = uuidv4();
        const professional = await this.professionalRepository.findById(input.professionalId);
        const client = await this.clientRepository.findById(input.clientId);
        if (!id) return Result.fail('Erro ao criar ID de agendamento');
        if (!professional) return Result.fail('Erro ao criar agendamento. Profissional não encontrado');
        if (!client) return Result.fail('Erro ao criar agendamento. Cliente não encontrado');
        const appointmentOrError = Appointment.create(id,input.startDate, input.endDate, input.price, professional, client, input.status);
        if (appointmentOrError.isFailure) return Result.fail('Erro ao criar agendamento ' + appointmentOrError.error);
        await this.appointmentRepository.save(appointmentOrError.getValue());
        const output = new CreateAppointmentOutput(id, input.startDate, input.endDate, input.price, input.professionalId, input.clientId, input.status);
        if (!output) return Result.fail('Erro ao criar agendamento. Output não gerado');
        return Result.ok<CreateAppointmentOutput>(output);
    }
}