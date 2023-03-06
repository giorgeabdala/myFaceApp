import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import { Ok, Err, Result } from 'ts-results';
import {Status} from "../../domain/entities/appointment";

type getAppointmentOutput = {
    id: string,
    startDate: Date,
    endDate: Date,
    price: number,
    professionalId: string,
    clientId: string,
    status: Status
};

export default class {

    constructor(readonly appointmentRepository: IAppointmentRepository) {}

    public async execute(clientId: string): Promise<Result<getAppointmentOutput[], string>> {
        const appointments = await this.appointmentRepository.findByClientId(clientId);
        if (appointments) {
            const appointmentsOutput: getAppointmentOutput[] = [];
            appointments.forEach(appointment => {
                appointmentsOutput.push({
                    id: appointment.id,
                    startDate: appointment.startDate,
                    endDate: appointment.endDate,
                    price: appointment.price,
                    professionalId: appointment.getProfessionalId(),
                    clientId: appointment.getClientId(),
                    status: appointment.status
                });
            });
            return Ok<getAppointmentOutput[]>(appointmentsOutput);
        }
    }
}