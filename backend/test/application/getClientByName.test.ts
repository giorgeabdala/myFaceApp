import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import IClientRepository from "../../src/domain/adapters/IClientRepository";
import getClientByNameUseCase from "../../src/application/usecase/getClientByName";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let factoryRepository: IRepositoryFactory;
let clientRepository: IClientRepository;

beforeAll(async () => {
    factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();
    clientRepository = factoryRepository.getClientRepository();
} );


describe('Deve testar a bsuca de Clients pelo nome', () => {
    it('Deve buscar clientes pelo nome', async () => {
        const findClientByNameUseCase = new getClientByNameUseCase(clientRepository);
        const clients = await findClientByNameUseCase.execute('Giorge');
        expect(clients.ok).toBeTruthy();
    } );
    it('Deve gerar um erro ao buscar um cliente inexistente', async () => {
        const findClientByNameUseCase = new getClientByNameUseCase(clientRepository);
        const clients = await findClientByNameUseCase.execute('Client100');
        expect(clients.ok).toBeFalsy();
    } );
} );