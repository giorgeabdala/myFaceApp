import {IAppointmentRepository} from "../../../domain/adapters/IAppointmentRepository";
import IConnection from "../../../domain/adapters/IConnection";
import {Appointment} from "../../../domain/entities/appointment";


export default class AppointmentRepositoryMongo implements IAppointmentRepository {
    private readonly connection: IConnection;

    constructor(connection: IConnection) {
        this.connection = connection;
    }

    delete(appointment: Appointment): Promise<void> {
        return Promise.resolve(undefined);
    }

    findByClientId(idClient: string): Promise<Appointment[]> {
        return Promise.resolve([]);
    }

    findById(id: string): Promise<Appointment> {
        return Promise.resolve(undefined);
    }

    findByProfessionalId(idProfessional: string): Promise<Appointment[]> {
        return Promise.resolve([]);
    }

    save(appointment: Appointment): Promise<void> {
        return Promise.resolve(undefined);
    }

    update(appointment: Appointment): Promise<Appointment> {
        return Promise.resolve(undefined);
    }
}