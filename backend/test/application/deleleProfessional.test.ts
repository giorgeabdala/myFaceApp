import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import DeleteProfessionalUseCase from "../../src/application/usecase/deleteProfessionalUseCase";

let factoryRepository: IRepositoryFactory;

beforeEach(() => {
    factoryRepository = FactoryBuilder.getFactoryRepository();
} );


describe('Deve testar a exclusão de profissionais', async () => {
    it('Deve excluir um profissional válido', async () => {
        const deleteProfessionalUseCase = new DeleteProfessionalUseCase(factoryRepository);
        const outputOrError = await deleteProfessionalUseCase.execute('1');
        const professionalRepository = factoryRepository.getProfessionalRepository();
        const findProfessional = await professionalRepository.findById('1');

        expect(findProfessional).toBeFalsy();
        expect(outputOrError.ok).toBe(true);
        const output = outputOrError.unwrap();
        expect(output).toBe(true);
    });

    it('Deve lançar um erro ao tentar excluir um profissional inexistente', async () => {
        const deleteProfessionalUseCase = new DeleteProfessionalUseCase(factoryRepository);
        const outputOrError = await deleteProfessionalUseCase.execute('99');
        expect(outputOrError.err).toBe(true);
    });
} );