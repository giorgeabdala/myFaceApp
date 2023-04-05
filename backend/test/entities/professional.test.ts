import {Professional} from '../../src/domain/entities/professional';

describe('Deve testar a criação de profissionais', () => {
    it('Deve criar um profissional válido', () => {
        const name = 'Jô';
        const professional =  Professional.create('2',name,'last', '41','985691112', 'giorgeabdala@gmail.com', 'calendarId').unwrap();

        expect(professional.id).toBe('2');
        expect(professional.firstName).toBe(name);
        expect(professional.lastName).toBe('last');
        expect(professional.cellPhone.DDD).toBe('41');
        expect(professional.cellPhone.phone).toBe('985691112');
        expect(professional.email).toBe('giorgeabdala@gmail.com');
        expect(professional.calendarId).toBe('calendarId');
    });

    it('Deve lançar um erro ao criar um profissional com nome inválido', () => {
        expect(() => Professional.create('1', 'J','last','41','985691112', 'giorgeabdala@gmail.com').err);
    } );

    it('Deve lançar um erro ao criar um profissional com DDD inválido', () => {
        expect(() => Professional.create('1', 'João','last','last','4','985691112', 'giorgeabdala@gmail.com').err);
    } );

    it('Deve lançar um erro ao criar um profissional com número inválido', () => {
        expect(() => Professional.create('1', 'João','last','41','98569111', 'giorgeabdala@gmail.com').err);
    } );

    it('Deve lançar um erro ao criar um profissional com email inválido', () => {
        expect(() => Professional.create('1', 'João','last','41','985691111', 'giorgeabdala@gmail').err);
    } );




} );