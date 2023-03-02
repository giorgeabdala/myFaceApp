import jest from 'jest';
import {Professional} from '../src/entities/professional';
import {Phone} from "../src/entities/phone";
import {Email} from "../src/entities/email";



describe('Deve testar a criação de profissionais', () => {
    it('Deve criar um profissional válido', () => {
        const name = 'Jô';
        const professional =  Professional.create(name, '41','985691112', 'giorgeabdala@gmail.com').getValue();

        expect(professional.name).toBe(name);
        expect(professional.cellPhone.DDD).toBe('41');
        expect(professional.cellPhone.number).toBe('985691112');
    });

    it('Deve lançar um erro ao criar um profissional com nome inválido', () => {
        expect(() => Professional.create('J','41','985691112', 'giorgeabdala@gmail.com').isFailure);
    } );

    it('Deve lançar um erro ao criar um profissional com DDD inválido', () => {
        expect(() => Professional.create('João','4','985691112', 'giorgeabdala@gmail.com').isFailure);
    } );

    it('Deve lançar um erro ao criar um profissional com número inválido', () => {
        expect(() => Professional.create('João','41','98569111', 'giorgeabdala@gmail.com').isFailure);
    } );

    it('Deve lançar um erro ao criar um profissional com email inválido', () => {
        expect(() => Professional.create('João','41','985691111', 'giorgeabdala@gmail').isFailure);
    } );
} );