import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import {CreateProfessionalUseCase} from "../../src/application/usecase/createProfessionalUseCase";
import { validate as uuidValidate } from 'uuid';
import {CreateProfessionalInput} from "../../src/application/dto/createProfessionalDTO";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let repository: IProfessionalRepository;
const factoryRepository = FactoryBuilder.createFactoryRepository();

beforeEach(() => {
    repository = factoryRepository.createProfessionalRepository();
} );

describe('Deve testar a criação de profissionais', () => {
    it('Deve criar um profissional válido', async () => {

        const createProfessionalUseCase = new CreateProfessionalUseCase(factoryRepository);

        const input = new CreateProfessionalInput('Giorge',
            'Abdala', '41', '985691112', 'giorgeabdala@gmai.com');

        const outputOrError = await createProfessionalUseCase.execute(input);
        expect(outputOrError.ok).toBe(true);
        const output = outputOrError.unwrap();
        expect(uuidValidate(output.id)).toBe(true);
        expect(output.id).not.toBe(null);
        expect(output.firstName).toBe(input.firstName);
        expect(output.lastName).toBe(input.lastName);
        expect(output.DDD).toBe(input.DDD);
        expect(output.number).toBe(input.number);
        expect(output.email).toBe(input.email);
    });

    it('Deve lançar um erro ao criar um profissional com nome inválido', async () => {
        const createProfessionalUseCase = new CreateProfessionalUseCase(factoryRepository);
        const input : CreateProfessionalInput = {
            firstName: 'J',
            lastName: 'Abdala',
            DDD: '41',
            number: '985691112',
            email: 'giorgeabdala@gmail.com'
        }
        const outputOrError = await createProfessionalUseCase.execute(input);
        expect(outputOrError.err).toBe(true);
    });

    it('Deve lançar um erro ao criar um profissional com DDD inválido', async () => {
        const createProfessionalUseCase = new CreateProfessionalUseCase(factoryRepository);
        const input: CreateProfessionalInput = {
            firstName: 'João',
            lastName: 'Abdala',
            DDD: '4',
            number: '985691112',
            email: 'giorgeabdala@gm.com'
        }
        const outputOrError = await createProfessionalUseCase.execute(input);
        expect(outputOrError.err).toBe(true);
} );

    it('Deve lançar um erro ao criar um profissional com número inválido', async () => {
        const createProfessionalUseCase = new CreateProfessionalUseCase(factoryRepository);
        const input: CreateProfessionalInput = {
            firstName: 'João',
            lastName: 'Abdala',
            DDD: '41',
            number: '98569111',
            email: 'giorgeabdala@gmail.com'
        }
        const outputOrError = await createProfessionalUseCase.execute(input);
        expect(outputOrError.err).toBe(true);
} );

    it('Deve lançar um erro ao criar um profissional com email inválido', async () => {
        const createProfessionalUseCase = new CreateProfessionalUseCase(factoryRepository);
        const input: CreateProfessionalInput = {
            firstName: 'João',
            lastName: 'Abdala',
            DDD: '41',
            number: '985691111',
            email: 'giorgeabdala@gmail'
        }
        const outputOrError = await createProfessionalUseCase.execute(input);
        expect(outputOrError.err).toBe(true);
    } );

    it ('Deve lançar um erro ao criar um profissional com um lastName inválido', async () => {
        const createProfessionalUseCase = new CreateProfessionalUseCase(factoryRepository);
        const input: CreateProfessionalInput = {
            firstName: 'João',
            lastName: 'b',
            DDD: '41',
            number: '985691111',
            email: 'giorgea@gmail.com'
        }
        const outputOrError = await createProfessionalUseCase.execute(input);
        expect(outputOrError.err).toBe(true);

  } );
});