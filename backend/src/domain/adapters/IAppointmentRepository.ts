import {Appointment} from "../entities/appointment";

public interface IAppointmentRepository {
     create(appointment: Appointment): Promise<Appointment>;
     update(appointment: Appointment): Promise<Appointment>;
     findById(id: number): Promise<Appointment>;
     findByProfessionalId(idProfessional: number): Promise<Appointment[]>;
     findByClientId(idClient: number): Promise<Appointment[]>;

}