import {Client} from "../../../src/domain/entities/client";
import {Professional} from "../../../src/domain/entities/professional";
import {Appointment, Status} from "../../../src/domain/entities/appointment";


const startDate = new Date(); // data atual
const endDate = new Date(new Date().getTime() + (60 * 60 * 1000));

export const clientFake = Client.create('2', 'teste', 'testeLast', '41', '999999999', 'email@gmail.com').unwrap();
export const clientFake2 = Client.create("4", "client4", "fake4", "44", "444444444", "email2@email.com").unwrap();
export const clientFake3 = Client.create("3", "client", "fake", "33", "333333333", "email2@email.com").unwrap();
export const professionalFake = Professional.create('2', 'teste','testeLast', '11', '999999999', 'email@gmail.com', '2').unwrap();
export const appointmentFake : Appointment = Appointment.create('2', startDate, endDate,1000, professionalFake, clientFake, Status.CONFIRMED).unwrap();

