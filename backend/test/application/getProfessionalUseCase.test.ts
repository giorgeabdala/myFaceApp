import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import ServiceFactory from "../../src/infra/factory/ServiceFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import GetProfessionalUseCase from "../../src/application/usecase/getProfessionalUseCase";


let factoryRepository: IRepositoryFactory;
let professionalRepository: IProfessionalRepository;

beforeAll(async () => {
    factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();
    professionalRepository = factoryRepository.getProfessionalRepository();
} );

describe('Deve testar o use case para buscar um profissional pelo ID', () => {

    it('Deve buscar profissionais pelo id', async () => {
        const getProfessionalUseCase = new GetProfessionalUseCase(factoryRepository);
        const professional = await getProfessionalUseCase.execute('1');
        expect(professional.ok).toBeTruthy();
    });

    it('Deve gerar um erro ao buscar um profissional inexistente', async () => {
        const getProfessionalUseCase = new GetProfessionalUseCase(factoryRepository);
        const professional = await getProfessionalUseCase.execute('100');
        expect(professional.ok).toBeFalsy();

    } );
} );