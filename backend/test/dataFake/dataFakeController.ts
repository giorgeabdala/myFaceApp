import {CreateProfessionalInput} from "../../src/application/dto/createProfessionalDTO";
import {CreateAppointmentInput} from "../../src/application/dto/createAppointmentDTO";
import {PaymentStatus, Status} from "../../src/domain/entities/appointment";

export const clientFakeController  = {
    firstName: "name",
    lastName: "Silva",
    DDD: "11",
    phone: "999999999",
    email: "giorge@gmail.cm"
};

export const professionalFakeCOntroller : CreateProfessionalInput = {
    firstName: 'João',
    lastName: 'Silva',
    DDD: '11',
    phone: '999999999',
    email: 'joao@gmail.com',
    calendarId: '2q0v1uhnvlpuksb710nvm0jfv4@group.calendar.google.com'

};


const startDate = new Date(); // data atual
const endDate = new Date(new Date().getTime() + (60 * 60 * 1000));
export const appointmentFakeController = new CreateAppointmentInput(
    startDate,
    endDate,
    99.99,
    '1',
    '1',
    Status.CONFIRMED,
    PaymentStatus.PAID

);