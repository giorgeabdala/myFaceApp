import {Appointment} from "../entities/appointment";

export interface IAppointmentRepository {
     save(appointment: Appointment): Promise<void>;
     update(appointment: Appointment): Promise<Appointment>;
     findById(id: string): Promise<Appointment>;
     findByProfessionalId(idProfessional: string): Promise<Appointment[]>;
     findByClientId(idClient: string): Promise<Appointment[]>;
}


