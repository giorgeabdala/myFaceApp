import {UpdateAppointmentInput, UpdateAppointmentOutput} from "../dto/updateAppointmentDTO";
import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import {Appointment} from "../../domain/entities/appointment";
import {Result} from "../../utils/result";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import ClientRepositoryMemory from "../../infra/repository/memory/ClientRepositoryMemory";
import {CreateAppointmentOutput} from "../dto/createAppointmentDTO";


export default class updateAppointmentUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) {}

    async execute(input: UpdateAppointmentInput): Promise<Result<UpdateAppointmentOutput>> {
       const appointment = await this.appointmentRepository.findById(input.id);
       if (!appointment) return Result.fail('Erro ao atualizar agendamento. Agendamento não encontrado');
       const appointmentOrError = Appointment.create(input.id, input.startDate, input.endDate, input.price, appointment.professional, appointment.client, input.status);
       if (appointmentOrError.isFailure) return Result.fail('Erro ao atualizar agendamento ' + appointmentOrError.error);
       const updatedAppointment = await this.appointmentRepository.update(appointmentOrError.getValue());
       const output =
           new UpdateAppointmentOutput(updatedAppointment.id,
               updatedAppointment.startDate,
               updatedAppointment.endDate,
               updatedAppointment.price,
               updatedAppointment.getProfessionalId(),
               updatedAppointment.getClientId(),
               updatedAppointment.status
    )
        if (!output) return Result.fail('Erro ao atualizar agendamento. Output não gerado');
        return Result.ok<CreateAppointmentOutput>(output);
    }
}