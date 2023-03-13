import {Appointment, Status} from '../../src/domain/entities/appointment';
import {Professional} from "../../src/domain/entities/professional";
import {Client} from "../../src/domain/entities/client";

let professional: Professional;
let client: Client;
let status: Status;
let startDate: Date;
let endDate: Date;

beforeEach(() => {
    professional =  Professional.create('1', 'João','last', '11', '999999999', 'giorgeabdala@gmail.com').unwrap();
    client =  Client.create('1', 'Maria', 'last','11', '999999999', 'giorgeabdala@gmail.com').unwrap();
    status = Status.CONFIRMED;

    startDate = new Date(); // data atual
    endDate = new Date(startDate.getTime() + (60 * 60 * 1000));
} );

describe('Deve testar a criação de agendamentos', () => {
    it('Deve criar um agendamento válido', () => {// adiciona uma hora
        const appointment = Appointment.create('2',startDate, endDate, 100, professional, client, status).unwrap();
        expect(appointment.id).toBe('2');
        expect(appointment.startDate).toBeInstanceOf(Date);
        expect(appointment.endDate).toBeInstanceOf(Date);
        expect(appointment.price).toBe(100);
        expect(appointment.professional).toBe(professional);
        expect(appointment.getProfessionalId()).toBe(professional.id);
        expect(appointment.getClientId()).toBe(client.id);
        expect(appointment.client).toBe(client);
        expect(appointment.status).toBe(status);
    } );
    it('Deve lançar um erro ao criar um agendamento com data de início inválida', () => {
        const appointmentOrError =  Appointment.create('1',new Date('01/01/2022'), new Date(), 100, professional, client, status);
        expect(appointmentOrError.err).toBe(true);
    } );
    it('Deve lançar um erro ao criar um agendamento com data de fim inválida', () => {
        expect(() => Appointment.create('1',new Date(), new Date(''), 100, professional, client, status).err);
    } );
    it('Deve lançar um erro ao criar um agendamento com preço inválido', () => {
        expect(() => Appointment.create('1',new Date(), new Date(), -100, professional, client, status).err);
    } );
    it('Deve lançar um erro ao criar um agendamento com profissional inválido', () => {
        expect(() => Appointment.create('1',new Date(), new Date(), 100,
            Professional.create('1','', 'last','11', '999999999', 'giorgeabdala@gmail.com').unwrap(), client, status).err);
} );
    it('Deve lançar um erro ao criar um agendamento com cliente inválido', () => {
        expect(() => Appointment.create('1', new Date(), new Date(), 100, professional,  Client.create('',
            'name','last', '999999999', 'giorgeabdala@gmail.com').unwrap(), status).err);
    } );
    it ('Deve lançar um erro ao criar um agendamento com data de início maior que a data de fim', () => {
        expect(() => Appointment.create('1', endDate, startDate, 100, professional, client, status).err);
    } );
    it ('Deve retornar a duração do antendimento em milisegundos', () => {
        const appointment = Appointment.create('1', startDate, endDate, 100, professional, client, status).unwrap();
        expect(appointment.calculateDuration()).toBe(endDate.getTime() - startDate.getTime());
    } );

} );



