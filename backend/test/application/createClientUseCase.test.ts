import IClientRepository from "../../src/domain/adapters/IClientRepository";
import {CreateClientInput, CreateClientOutput} from "../../src/application/dto/createClientDTO";
import CreateClientUseCase from "../../src/application/usecase/createClientUseCase";
import { validate as uuidValidate } from 'uuid';
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let  clientRepository: IClientRepository;
const factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();

beforeEach(() => {

     clientRepository = factoryRepository.getClientRepository();
 } );

describe('CreateClient', () => {
    it('Deve criar um cliente', async () => {
        const input = new CreateClientInput('Giorge', 'Abdala', '41', '985691112');
        const useCase = new CreateClientUseCase(factoryRepository);
        const outputOrError = await useCase.execute(input);
        expect(outputOrError.ok).toBe(true);

        const output = outputOrError.unwrap();
        expect(output).toBeInstanceOf(CreateClientOutput);
        expect(output.id).not.toBeNull();
        expect(uuidValidate(output.id)).toBe(true);
        expect(output.firstName).toBe('Giorge');
        expect(output.lastName).toBe('Abdala');
        expect(output.DDD).toBe('41');
        expect(output.phone).toBe('985691112');
    } );

    } );

