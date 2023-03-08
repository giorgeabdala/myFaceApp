import {Appointment, Status} from '../../../domain/entities/appointment';
import {IAppointmentRepository} from "../../../domain/adapters/IAppointmentRepository";
import {Client} from "../../../domain/entities/client";
import {Professional} from "../../../domain/entities/professional";

export default class implements IAppointmentRepository {
    appointments: Appointment[] = [];


    constructor() {
        const startDate = new Date(); // data atual
        const endDate = new Date(new Date().getTime() + (60 * 60 * 1000));

        const clientOne = Client.create('1', 'Giorge', '11', '999999999', 'giorgeabdala@gmail.com').unwrap();
        const clientTwo  = Client.create('2', 'Jo', '11', '999999999', 'giorgeabdala@gmail.com').unwrap();
        const clientThree = Client.create('3', "bruna", '11', '999999999', 'giorgeabdala@gmail.com').unwrap();

        const professionalOne = Professional.create('1', 'Mara', '11', '999999999', 'joao@gmail.com', 'j2ialadmckmcdne2i7bmfvsovs@group.calendar.google.com').unwrap();
        const professionalTwo =    Professional.create('2', 'Giorge', '11', '999999999', 'maria@gmail.com').unwrap();
        const professionalThree =     Professional.create('3', 'José', '11', '999999999', 'jose@gmail.com').unwrap();

        this.appointments = [
            Appointment.create('1', startDate, endDate, 100, professionalOne, clientOne, Status.CONFIRMED).unwrap(),
            Appointment.create('2', startDate, endDate, 58.62, professionalTwo, clientTwo, Status.FINISHED).unwrap(),
            Appointment.create('3', startDate, endDate, 99.5, professionalThree, clientThree, Status.CANCELED).unwrap(),
            Appointment.create('3', startDate, endDate, 99.5, professionalTwo, clientOne, Status.CANCELED).unwrap()
        ];
    }

    async save(appointment: Appointment): Promise<void> {
        this.appointments.push(appointment);
    }

    async update(appointment: Appointment): Promise<Appointment> {
        const index = this.appointments.findIndex((value) => value.id === appointment.id);
        this.appointments[index] = appointment;
        return this.appointments[index];
    }

    async findById(id: string): Promise<Appointment> {
        return this.appointments.find((value) => value.id === id    );
    }

    async findByProfessionalId(idProfessional: string): Promise<Appointment[]> {
        return this.appointments.filter((value) => value.getProfessionalId() === idProfessional);
    }

    async findByClientId(idClient: string): Promise<Appointment[]> {
        return this.appointments.filter((value) => value.getClientId() === idClient);
    }
}


