import IClientRepository from "../../src/domain/adapters/IClientRepository";
import {CreateClientInput, CreateClientOutput} from "../../src/application/dto/createClientDTO";
import CreateClient from "../../src/application/usecase/createClient";
import { validate as uuidValidate } from 'uuid';
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

let  clientRepository: IClientRepository;
const factoryRepository = new MemoryRepositoryFactory();

beforeEach(() => {

     clientRepository = factoryRepository.createClientRepository();
 } );

describe('CreateClient', () => {
    it('Deve criar um cliente', async () => {
        const input = new CreateClientInput('Giorge', 'Abdala', '41', '985691112');
        const useCase = new CreateClient(factoryRepository);
        const outputOrError = await useCase.execute(input);
        expect(outputOrError.ok).toBe(true);

        const output = outputOrError.unwrap();
        expect(output).toBeInstanceOf(CreateClientOutput);
        expect(output.id).not.toBeNull();
        expect(uuidValidate(output.id)).toBe(true);
        expect(output.firstName).toBe('Giorge');
        expect(output.lastName).toBe('Abdala');
        expect(output.DDD).toBe('41');
        expect(output.number).toBe('985691112');
    } );

    } );

