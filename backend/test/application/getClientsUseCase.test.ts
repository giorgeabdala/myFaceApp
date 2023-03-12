import IClientRepository from "../../src/domain/adapters/IClientRepository";
import ClientRepositoryMemory from "../../src/infra/repository/memory/ClientRepositoryMemory";
import GetClients from "../../src/application/usecase/getClients";

let repository: IClientRepository;

beforeEach(() => {
    repository = new ClientRepositoryMemory();
} );

describe('Deve testar a busca de todos os clientes', () => {
    it('Deve buscar todos os clientes', async () => {
        const useCase = new GetClients(repository);
        const outputOrError = await useCase.execute();
        expect(outputOrError.ok).toBe(true);

        const output = outputOrError.unwrap();
        expect(output).toBeInstanceOf(Array);
        expect(output[0].id).toBeTruthy();
        expect(output[0].firstName).toBeTruthy();
        expect(output[0].lastName).toBeTruthy();
        expect(output[0].number).toBeTruthy();
        expect(output[0].DDD).toBeTruthy();
    } );
} );