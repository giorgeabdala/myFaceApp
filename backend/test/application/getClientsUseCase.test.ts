import IClientRepository from "../../src/domain/adapters/IClientRepository";
import GetClientsUseCase from "../../src/application/usecase/getClientsUseCase";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let repository: IClientRepository;
const factoryRepository = FactoryBuilder.createFactoryRepository();

beforeEach(() => {
    repository = factoryRepository.createClientRepository();
} );

describe('Deve testar a busca de todos os clientes', () => {
    it('Deve buscar todos os clientes', async () => {
        const useCase = new GetClientsUseCase(factoryRepository);
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