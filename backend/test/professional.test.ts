import jest from 'jest';
import {Professional} from '../src/entities/professional';
import {Phone} from "../src/entities/phone";
import {Email} from "../src/entities/email";



describe('Deve testar a criação de profissionais', () => {
    it('Deve criar um profissional válido', () => {
        const name = 'Jô';
        const professional = new Professional(name, new Phone('41','985691112'), new Email('giorgeabdala@gmail.com'));

        expect(professional.name).toBe(name);
        expect(professional.cellPhone.DDD).toBe('41');
        expect(professional.cellPhone.number).toBe('985691112');
    });

    it('Deve lançar um erro ao criar um profissional com nome inválido', () => {
        expect(() => new Professional('J',new Phone('41','985691112'), new Email('giorgeabdala@gmail.com'))).toThrow();
    } );

    it('Deve lançar um erro ao criar um profissional com DDD inválido', () => {
        expect(() => new Professional('João',new Phone('4','985691112'), new Email('giorgeabdala@gmail.com'))).toThrow();
    } );

    it('Deve lançar um erro ao criar um profissional com número inválido', () => {
        expect(() => new Professional('João',new Phone('41','98569111'), new Email('giorgeabdala@gmail.com'))).toThrow();
    } );

    it('Deve lançar um erro ao criar um profissional com email inválido', () => {
        expect(() => new Professional('João',new Phone('41','985691111'), new Email('giorgeabdala@gmail'))).toThrow();
    } );
} );