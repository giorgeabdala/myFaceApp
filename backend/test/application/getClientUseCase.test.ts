import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import IClientRepository from "../../src/domain/adapters/IClientRepository";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import GetClientUseCase from "../../src/application/usecase/getClientUseCase";


let factoryRepository: IRepositoryFactory;
let clientRepository: IClientRepository;

beforeAll(async () => {
    factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();
    clientRepository = factoryRepository.getClientRepository();
} );


describe('Deve testar a busca de Clientes', () => {
    it('Deve buscar clientes pelo id', async () => {
        const getClientUseCase = new GetClientUseCase(factoryRepository);
        const client = await getClientUseCase.execute('1');
        expect(client.ok).toBeTruthy();
    } );

    it('Deve gerar um erro ao buscar um cliente inexistente', async () => {
        const getClientUseCase = new GetClientUseCase(factoryRepository);
        const client = await getClientUseCase.execute('100');
        expect(client.ok).toBeFalsy();
    } );
} );