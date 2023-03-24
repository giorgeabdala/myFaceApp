import DeleteClientUseCase from "../../src/application/usecase/deleteClientUseCase";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let factoryRepository: IRepositoryFactory;

beforeEach(() => {
    factoryRepository = FactoryBuilder.getFactoryRepository();
} );


describe('Deve testar a exclusão de clientes', async () => {
    it('Deve excluir um cliente válido', async () => {

        const deleteClientUseCase = new DeleteClientUseCase(factoryRepository);
        const outputOrError = await deleteClientUseCase.execute('1');
        const clientRepository = factoryRepository.getClientRepository();
        const findClient = await clientRepository.findById('1');
        expect(findClient).toBeFalsy();
        expect(outputOrError.ok).toBe(true);
        const output = outputOrError.unwrap();
        expect(output).toBe(true);
    });

    it('Deve lançar um erro ao tentar excluir um cliente inexistente', async () => {
        const deleteClientUseCase = new DeleteClientUseCase(factoryRepository);
        const outputOrError = await deleteClientUseCase.execute('99');
        expect(outputOrError.err).toBe(true);
    });
} );