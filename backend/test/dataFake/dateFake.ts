import {Client} from "../../src/domain/entities/client";
import {Professional} from "../../src/domain/entities/professional";
import {Appointment, Status} from "../../src/domain/entities/appointment";

const startDate = new Date(); // data atual
const endDate = new Date(new Date().getTime() + (60 * 60 * 1000));

export const clientFake = Client.create('2', 'teste', 'testeLast', '41', '998464496', 'email@gmail.com').unwrap();
export const clientFake2 = Client.create("3", "client4", "fake4", "44", "444444444", "email2@email.com").unwrap();
export const clientFake3 = Client.create("4", "client", "fake", "33", "333333333", "email2@email.com").unwrap();

export const professionalFake = Professional.create('10',
    'teste',
    'testeLast',
    '11',
    '999999999',
    'email@gmail.com',
    'j2ialadmckmcdne2i7bmfvsovs@group.calendar.google.com').unwrap();

export const professionalFake2 = Professional.create('3',
    'teste3',
    'testeLast3',
    '33',
    '333333333',
    'email@gmail.com',
    '3').unwrap();

export const professionalFake3 = Professional.create('4',
    'teste4',
    'testeLast4',
    '44',
    '444444444',
    'email4@gmail.com',
    '4').unwrap();

export const appointmentFake: Appointment = Appointment.create('2',
    startDate,
    endDate,
    2000,
    professionalFake,
    clientFake,
    Status.CONFIRMED).unwrap();

export const appointmentFake2: Appointment = Appointment.create('3',
    startDate,
    endDate,
    3000,
    professionalFake2,
    clientFake2,
    Status.CONFIRMED).unwrap();

