import vitest from "vitest";
import {Client} from '../../src/domain/entities/client';

let client: Client;

beforeEach(() => {
    client = Client.create('2','Giorge','Abdala', '41', '985691112').unwrap();
} );

describe('Deve testar a criação de clientes', () => {
    it('Deve criar um cliente válido', () => {
        expect(client.id).toBe('2');
        expect(client.firstName).toBe('Giorge');
        expect(client.lastName).toBe('Abdala');
        expect(client.cellPhone.DDD).toBe('41');
        expect(client.cellPhone.phone).toBe('985691112');
} );
    it('Deve lançar um erro ao criar um cliente com nome inválido', () => {
        expect(() =>  Client.create('uuid', 'G','last', '41', '985691112').err);
    } );
    it('Deve lançar um erro ao criar um cliente com DDD inválido', () => {
        expect(() =>  Client.create('uuid','Giorge', 'Abdala',  '4', '985691112').err);
    }
    );
    it('Deve lançar um erro ao criar um cliente com número inválido', () => {
        expect(() =>  Client.create('uuid','Giorge', 'Abdala',  '41', '98569111').err);
    }   );


    it('Deve lançar um erro ao criar um cliente com last name inválido', () => {
        expect(() =>  Client.create('uuid','Giorge', 'A',  '41', '995981212').err);
    }  );

}  ) ;
