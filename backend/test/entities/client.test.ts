import jest from 'jest';
import {Client} from '../src/domain/entities/client';
import {Phone} from "../src/domain/entities/phone";

let client: Client;

beforeEach(() => {
    client = Client.create('2','Giorge Abdala', '41', '985691112').getValue();
} );

describe('Deve testar a criação de clientes', () => {
    it('Deve criar um cliente válido', () => {
        expect(client.id).toBe('2');
        expect(client.name).toBe('Giorge Abdala');
        expect(client.cellPhone.DDD).toBe('41');
        expect(client.cellPhone.number).toBe('985691112');
} );
    it('Deve lançar um erro ao criar um cliente com nome inválido', () => {
        expect(() =>  Client.create('uuid', 'G',  '41', '985691112').isFailure);
    } );
    it('Deve lançar um erro ao criar um cliente com DDD inválido', () => {
        expect(() =>  Client.create('uuid','Giorge Abdala',  '4', '985691112').isFailure);
    }
    );
    it('Deve lançar um erro ao criar um cliente com número inválido', () => {
        expect(() =>  Client.create('uuid','Giorge Abdala',  '41', '98569111').isFailure);
    }   );

    it ('Deve alterar a annotation de um cliente', () => {
        client.setAnnotations('Cliente de teste');
        expect(client.getAnnotations()).toBe('Cliente de teste');
    } );

}  ) ;
