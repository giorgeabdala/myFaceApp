import IClientRepository from "../../src/domain/adapters/IClientRepository";
import FindAllClientsUseCase from "../../src/application/usecase/findAllClientsUseCase";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let repository: IClientRepository;
const factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();

beforeEach(() => {
    repository = factoryRepository.getClientRepository();
} );

describe('Deve testar a busca de todos os clientes', () => {
    it('Deve buscar todos os clientes', async () => {
        const useCase = new FindAllClientsUseCase(factoryRepository);
        const outputOrError = await useCase.execute();
        expect(outputOrError.ok).toBe(true);

        const output = outputOrError.unwrap();
        expect(output).toBeInstanceOf(Array);
        expect(output[0].id).toBeTruthy();
        expect(output[0].firstName).toBeTruthy();
        expect(output[0].lastName).toBeTruthy();
        expect(output[0].phone).toBeTruthy();
        expect(output[0].DDD).toBeTruthy();
        expect(output[0].firstName).toBe('Giorge');
        expect(output[0].lastName).toBe('abdala');
        expect(output[0].phone).toBe('995691111');
        expect(output[0].DDD).toBe('41');
        expect(output[0].email).toBe('giorgeabdala@gmail.com');
    } );
} );