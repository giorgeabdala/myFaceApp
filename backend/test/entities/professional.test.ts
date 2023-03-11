import jest from 'jest';
import {Professional} from '../../src/domain/entities/professional';
import {Phone} from "../../src/domain/entities/phone";
import {Email} from "../../src/domain/entities/email";

let token_fake = 'ya29.a0AVvZVsqhy2IuwRzf3oXF3fghuK66R9JEj-sFauMPcRX2BNGNQGOEThQIMXrqj17yODiYCwc0MSj8acdK8D-pg2D8aDxRR6py8HXe_ZeYq_n9uGSDMDDCImwceyeaXfvXet1iJn8Udgt-AbKtHGv4IGY_oWeEaCgYKAYoSARASFQGbdwaIfp7To16JuD9otalGC6lMRA0163';

describe('Deve testar a criação de profissionais', () => {
    it('Deve criar um profissional válido', () => {
        const name = 'Jô';
        const professional =  Professional.create('2',name, '41','985691112', 'giorgeabdala@gmail.com', 'calendarId').unwrap();

        expect(professional.id).toBe('2');
        expect(professional.name).toBe(name);
        expect(professional.cellPhone.DDD).toBe('41');
        expect(professional.cellPhone.number).toBe('985691112');
        expect(professional.email.address).toBe('giorgeabdala@gmail.com');
        expect(professional.calendarId).toBe('calendarId');
    });

    it('Deve lançar um erro ao criar um profissional com nome inválido', () => {
        expect(() => Professional.create('1', 'J','41','985691112', 'giorgeabdala@gmail.com').err);
    } );

    it('Deve lançar um erro ao criar um profissional com DDD inválido', () => {
        expect(() => Professional.create('1', 'João','4','985691112', 'giorgeabdala@gmail.com').err);
    } );

    it('Deve lançar um erro ao criar um profissional com número inválido', () => {
        expect(() => Professional.create('1', 'João','41','98569111', 'giorgeabdala@gmail.com').err);
    } );

    it('Deve lançar um erro ao criar um profissional com email inválido', () => {
        expect(() => Professional.create('1', 'João','41','985691111', 'giorgeabdala@gmail').err);
    } );




} );