import jest from 'jest';
import {Client} from '../../src/domain/entities/client';
import IClientRepository from "../../src/domain/adapters/IClientRepository";
import ClientRepositoryMemory from "../../src/infra/repository/memory/ClientRepositoryMemory";
import GetClientsOutput from "../../src/application/dto/getClientsOutput";
import { validate as uuidValidate } from 'uuid';
import GetClientsUseCase from "../../src/application/usecase/getClientsUseCase";


let repository: IClientRepository;

beforeEach(() => {
    repository = new ClientRepositoryMemory();
} );

describe('Deve testar a busca de todos os clientes', () => {
    it('Deve buscar todos os clientes', async () => {
        const useCase = new GetClientsUseCase(repository);
        const outputOrError = await useCase.execute();
        expect(outputOrError.isSuccess).toBe(true);

        const output = outputOrError.getValue();
        expect(output).toBeInstanceOf(Array);
        expect(output[0].id).toBeTruthy();
        expect(output[0].name).toBeTruthy();
        expect(output[0].number).toBeTruthy();
        expect(output[0].DDD).toBeTruthy();
    } );
} );