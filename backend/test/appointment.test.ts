import jest from 'jest';
import {Appointment, Status} from '../src/entities/appointment';
import {Professional} from "../src/entities/professional";
import {Client} from "../src/entities/client";
import {Email} from "../src/entities/email";
import {Phone} from "../src/entities/phone";

let professional: Professional;
let client: Client;
let status: Status;
let startDate: Date;
let endDate: Date;

beforeEach(() => {
    professional = new Professional('João', new Phone('11', '999999999'), new Email('giorgeabdala@gmail.com'));
    client = new Client('Maria', new Phone('11', '999999999'), new Email('giorgeabdala@gmail.com'));
    status = Status.CONFIRMED;

    startDate = new Date(); // data atual
    endDate = new Date(startDate.getTime() + (60 * 60 * 1000));
} );

describe('Deve testar a criação de agendamentos', () => {
    it('Deve criar um agendamento válido', () => {// adiciona uma hora
        const appointment = new Appointment(startDate, endDate, 100, professional, client, status);
        expect(appointment.startDate).toBeInstanceOf(Date);
        expect(appointment.endDate).toBeInstanceOf(Date);
        expect(appointment.price).toBe(100);
        expect(appointment.professional).toBe(professional);
        expect(appointment.client).toBe(client);
        expect(appointment.status).toBe(status);
    } );
    it('Deve lançar um erro ao criar um agendamento com data de início inválida', () => {
        expect(() => new Appointment(new Date('01/01/2022'), new Date(), 100, professional, client, status)).toThrow();
    } );
    it('Deve lançar um erro ao criar um agendamento com data de fim inválida', () => {
        expect(() => new Appointment(new Date(), new Date(''), 100, professional, client, status)).toThrow();
    } );
    it('Deve lançar um erro ao criar um agendamento com preço inválido', () => {
        expect(() => new Appointment(new Date(), new Date(), -100, professional, client, status)).toThrow();
    } );
    it('Deve lançar um erro ao criar um agendamento com profissional inválido', () => {
        expect(() => new Appointment(new Date(), new Date(), 100, new Professional('', new Phone('11', '999999999'), new Email('giorgeabdala@gmail.com')), client, status)).toThrow();
} );
    it('Deve lançar um erro ao criar um agendamento com cliente inválido', () => {
        expect(() => new Appointment(new Date(), new Date(), 100, professional, new Client('', new Phone('11', '999999999'), new Email('giorgeabdala@gmail.com')), status)).toThrow();
    } );
    it ('Deve lançar um erro ao criar um agendamento com data de início maior que a data de fim', () => {
        expect(() => new Appointment(endDate, startDate, 100, professional, client, status)).toThrow();
    } );
    it ('Deve retornar a duração do antendimento em milisegundos', () => {
        const appointment = new Appointment(startDate, endDate, 100, professional, client, status);
        expect(appointment.calculateDuration()).toBe(endDate.getTime() - startDate.getTime());
    } );

} );



