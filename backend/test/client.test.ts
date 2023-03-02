import jest from 'jest';
import {Client} from '../src/entities/client';
import {Phone} from "../src/entities/phone";

describe('Deve testar a criação de clientes', () => {
    it('Deve criar um cliente válido', () => {
        const client = Client.create('Giorge Abdala', '41', '985691112').getValue();
        expect(client.name).toBe('Giorge Abdala');
} );
    it('Deve lançar um erro ao criar um cliente com nome inválido', () => {
        expect(() =>  Client.create('G',  '41', '985691112').isFailure);
    } );
    it('Deve lançar um erro ao criar um cliente com DDD inválido', () => {
        expect(() =>  Client.create('Giorge Abdala',  '4', '985691112').isFailure);
    }
    );
    it('Deve lançar um erro ao criar um cliente com número inválido', () => {
        expect(() =>  Client.create('Giorge Abdala',  '41', '98569111').isFailure);
    }   );

    it ('Deve alterar a annotation de um cliente', () => {
        const client = Client.create('Giorge Abdala', '41', '985691112').getValue();
        client.setAnnotations('Cliente de teste');
        expect(client.getAnnotations()).toBe('Cliente de teste');
    } );

}  ) ;
