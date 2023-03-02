import jest from 'jest';
import {Appointment, Status} from '../src/domain/entities/appointment';
import {Professional} from "../src/domain/entities/professional";
import {Client} from "../src/domain/entities/client";
import {Email} from "../src/domain/entities/email";
import {Phone} from "../src/domain/entities/phone";

let professional: Professional;
let client: Client;
let status: Status;
let startDate: Date;
let endDate: Date;

beforeEach(() => {
    professional =  Professional.create('1', 'João', '11', '999999999', 'giorgeabdala@gmail.com').getValue();
    client =  Client.create('1', 'Maria', '11', '999999999', 'giorgeabdala@gmail.com').getValue();
    status = Status.CONFIRMED;

    startDate = new Date(); // data atual
    endDate = new Date(startDate.getTime() + (60 * 60 * 1000));
} );

describe('Deve testar a criação de agendamentos', () => {
    it('Deve criar um agendamento válido', () => {// adiciona uma hora
        const appointment = Appointment.create('2',startDate, endDate, 100, professional, client, status).getValue();
        expect(appointment.id).toBe('2');
        expect(appointment.startDate).toBeInstanceOf(Date);
        expect(appointment.endDate).toBeInstanceOf(Date);
        expect(appointment.price).toBe(100);
        expect(appointment.professional).toBe(professional);
        expect(appointment.client).toBe(client);
        expect(appointment.status).toBe(status);
    } );
    it('Deve lançar um erro ao criar um agendamento com data de início inválida', () => {
        expect(() => Appointment.create('1',new Date('01/01/2022'), new Date(), 100, professional, client, status).isFailure);
    } );
    it('Deve lançar um erro ao criar um agendamento com data de fim inválida', () => {
        expect(() => Appointment.create('1',new Date(), new Date(''), 100, professional, client, status).isFailure);
    } );
    it('Deve lançar um erro ao criar um agendamento com preço inválido', () => {
        expect(() => Appointment.create('1',new Date(), new Date(), -100, professional, client, status).isFailure);
    } );
    it('Deve lançar um erro ao criar um agendamento com profissional inválido', () => {
        expect(() => Appointment.create('1',new Date(), new Date(), 100, Professional.create('1','', '11', '999999999', 'giorgeabdala@gmail.com').getValue(), client, status).isFailure);
} );
    it('Deve lançar um erro ao criar um agendamento com cliente inválido', () => {
        expect(() => Appointment.create('1', new Date(), new Date(), 100, professional,  Client.create('', '11', '999999999', 'giorgeabdala@gmail.com').getValue(), status).isFailure);
    } );
    it ('Deve lançar um erro ao criar um agendamento com data de início maior que a data de fim', () => {
        expect(() => Appointment.create('1', endDate, startDate, 100, professional, client, status).isFailure);
    } );
    it ('Deve retornar a duração do antendimento em milisegundos', () => {
        const appointment = Appointment.create('1', startDate, endDate, 100, professional, client, status).getValue();
        expect(appointment.calculateDuration()).toBe(endDate.getTime() - startDate.getTime());
    } );

} );



