import jest from 'jest';
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import ProfessionalRepositoryMemory from "../../src/infra/repository/memory/ProfessionalRepositoryMemory";
import {CreateProfessional} from "../../src/application/usecase/createProfessional";
import { validate as uuidValidate } from 'uuid';

let repository: IProfessionalRepository;

beforeEach(() => {
    repository = new ProfessionalRepositoryMemory();
} );

describe('Deve testar a criação de profissionais', () => {
    it('Deve criar um profissional válido', async () => {

        const createProfessionalUseCase = new CreateProfessional(repository);
        const input = {
            name: 'Jô',
            DDD: '41',
            number: '985691112',
            email: 'giorgeabdala@gmail.com'
        }
        const outputOrError = await createProfessionalUseCase.execute(input);
        expect(outputOrError.ok).toBe(true);
        const output = outputOrError.unwrap();
        expect(uuidValidate(output.id)).toBe(true);
        expect(output.id).not.toBe(null);
        expect(output.name).toBe(input.name);
        expect(output.DDD).toBe(input.DDD);
        expect(output.number).toBe(input.number);
        expect(output.email).toBe(input.email);
    });

    it('Deve lançar um erro ao criar um profissional com nome inválido', async () => {
        const createProfessionalUseCase = new CreateProfessional(repository);
        const input = {
            name: 'J',
            DDD: '41',
            number: '985691112',
            email: 'giorgeabdala@gmail.com'
        }
        const outputOrError = await createProfessionalUseCase.execute(input);
        expect(outputOrError.err).toBe(true);
        //expect(outputOrError.err).toBe('Nome inválido');
    });

} );