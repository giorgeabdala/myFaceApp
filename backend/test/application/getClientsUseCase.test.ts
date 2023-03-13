import IClientRepository from "../../src/domain/adapters/IClientRepository";
import GetClients from "../../src/application/usecase/getClients";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

let repository: IClientRepository;
const factoryRepository = new MemoryRepositoryFactory();

beforeEach(() => {
    repository = factoryRepository.createClientRepository();
} );

describe('Deve testar a busca de todos os clientes', () => {
    it('Deve buscar todos os clientes', async () => {
        const useCase = new GetClients(factoryRepository);
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