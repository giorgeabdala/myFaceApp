import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import { Ok, Result } from 'ts-results';
import {Status} from "../../domain/entities/appointment";
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";

type FindAppointmentOutput = {
    id: string,
    startDate: Date,
    endDate: Date,
    price: number,
    professionalId: string,
    clientId: string,
    status: Status
};

export default class FindAppointmentByClientUseCase {
    private  appointmentRepository: IAppointmentRepository;

    constructor(readonly factoryRepository: IRepositoryFactory) {
        this.appointmentRepository = factoryRepository.getAppointmentsRepository();
    }

    public async execute(clientId: string): Promise<Result<FindAppointmentOutput[], string>> {
        const appointments = await this.appointmentRepository.findByClientId(clientId);
        const appointmentsOutput: FindAppointmentOutput[] = [];
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

        return Ok<FindAppointmentOutput[]>(appointmentsOutput);
    }
}