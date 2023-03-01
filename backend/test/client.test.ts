import jest from 'jest';
import {Client} from '../src/entities/client';
import {Phone} from "../src/entities/phone";

describe('Deve testar a criação de clientes', () => {
    it('Deve criar um cliente válido', () => {
        const client = new Client('Giorge Abdala', new Phone('41', '985691112'));
        expect(client.name).toBe('Giorge Abdala');
} );
    it('Deve lançar um erro ao criar um cliente com nome inválido', () => {
        expect(() => new Client('G', new Phone('41', '985691112'))).toThrow();
    } );
    it('Deve lançar um erro ao criar um cliente com DDD inválido', () => {
        expect(() => new Client('Giorge Abdala', new Phone('4', '985691112'))).toThrow();
    }
    );
    it('Deve lançar um erro ao criar um cliente com número inválido', () => {
        expect(() => new Client('Giorge Abdala', new Phone('41', '98569111'))).toThrow();
    }   );

    it ('Deve alterar a annotation de um cliente', () => {
        const client = new Client('Giorge Abdala', new Phone('41', '985691112'));
        client.setAnnotations('Cliente de teste');
        expect(client.getAnnotations()).toBe('Cliente de teste');
    } );

    it ('Deve lançar um erro ao tentar alterar a annotation de um cliente para uma string com poucos caracteres', () => {
        const client = new Client('Giorge Abdala', new Phone('41', '985691112'));
        expect(() => client.setAnnotations('')).toThrow();
    } );

} );
