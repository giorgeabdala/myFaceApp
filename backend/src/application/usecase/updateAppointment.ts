import {UpdateAppointmentInput, UpdateAppointmentOutput} from "../dto/updateAppointmentDTO";
import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import {Appointment} from "../../domain/entities/appointment";
import { Ok, Err, Result } from 'ts-results';
import {CreateAppointmentOutput} from "../dto/createAppointmentDTO";


export default class UpdateAppointment {
    constructor(private readonly appointmentRepository: IAppointmentRepository) {}

    async execute(input: UpdateAppointmentInput): Promise<Result<UpdateAppointmentOutput, string>> {
       const appointment     = await this.appointmentRepository.findById(input.id);
       if (!appointment) return new Err('Erro ao atualizar agendamento. Agendamento não encontrado');
       const appointmentOrError = Appointment.create(input.id, input.startDate, input.endDate, input.price, appointment.professional, appointment.client, input.status);
       if (appointmentOrError.err) return new Err('Erro ao atualizar agendamento ' + appointmentOrError.err);
       const updatedAppointment = await this.appointmentRepository.update(appointmentOrError.unwrap());
       const output =
           new UpdateAppointmentOutput(updatedAppointment.id,
               updatedAppointment.startDate,
               updatedAppointment.endDate,
               updatedAppointment.price,
               updatedAppointment.getProfessionalId(),
               updatedAppointment.getClientId(),
               updatedAppointment.status
    )
        if (!output) return new Err('Erro ao atualizar agendamento. Output não gerado');
        return Ok<CreateAppointmentOutput>(output);
    }
}