import jest from 'jest';
import { Phone } from '../src/entities/phone';

describe('Deve testar a criação de phones', () => {
    it('Deve criar um telefone válido', () => {
        const phone = new Phone('41','985691112');

        expect(phone.DDD).toBe('41');
        expect(phone.number).toBe('985691112');
    });

    it('Deve lançar um erro ao criar um telefone com DDD inválido', () => {
        expect(() => new Phone('4','985691112')).toThrow();
    } );

    it('Deve lançar um erro ao criar um telefone com número inválido', () => {
        expect(() => new Phone('41','98569111')).toThrow();
    } );
} );



