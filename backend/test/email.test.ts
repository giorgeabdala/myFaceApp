import jest from 'jest';
import { Email } from '../src/entities/email';

describe('Deve testar a criação de emails', () => {
    it('Deve criar um email válido', () => {
        const email = new Email('giorgeabdala@gmail.com');
        expect(email.address).toBe('giorgeabdala@gmail.com');
} );

    it('Deve lançar um erro ao criar um email inválido', () => {
        expect(() => new Email('giorgeabdala@gmail')).toThrow();
    }  );



 } );