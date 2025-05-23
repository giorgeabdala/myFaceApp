import jest from 'jest';
import { Phone } from '../../src/domain/entities/phone';

describe('Deve testar a criação de phones', () => {
    it('Deve criar um telefone válido', () => {
        const phone =  Phone.create('41','985691112').unwrap();

        expect(phone.DDD).toBe('41');
        expect(phone.phone).toBe('985691112');
    });

    it('Deve lançar um erro ao criar um telefone com DDD inválido', () => {
        expect(() => Phone.create('4','985691112').err);
    } );

    it('Deve lançar um erro ao criar um telefone com número inválido', () => {
        expect(() => Phone.create('41','98569111').err);
    } );
} );



