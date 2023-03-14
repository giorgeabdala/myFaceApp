import {IAppointmentRepository} from "../../domain/adapters/IAppointmentRepository";
import { Ok, Result } from 'ts-results';
import {Status} from "../../domain/entities/appointment";
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";

type getAppointmentOutput = {
    id: string,
    startDate: Date,
    endDate: Date,
    price: number,
    professionalId: string,
    clientId: string,
    status: Status
};

export default class getAppointmentByClientUseCase {
    private  appointmentRepository: IAppointmentRepository;

    constructor(readonly factoryRepository: IRepositoryFactory) {
        this.appointmentRepository = factoryRepository.createAppointmentsRepository();
    }

    public async execute(clientId: string): Promise<Result<getAppointmentOutput[], string>> {
        const appointments = await this.appointmentRepository.findByClientId(clientId);
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