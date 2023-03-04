import jest from 'jest';
import { Email } from '../src/domain/entities/email';

describe('Deve testar a criação de emails', () => {
    it('Deve criar um email válido', () => {
        const emailorError = Email.create('giorgeabdala@gmail.com');
        expect(emailorError.getValue().address).toBe('giorgeabdala@gmail.com');
} );

    it('Deve lançar um erro ao criar um email inválido', () => {
        expect(() => Email.create('giorgeabdala@gmail').isFailure)
    }  );



 } );