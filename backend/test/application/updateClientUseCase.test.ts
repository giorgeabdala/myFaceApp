import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import {UpdateClientInput, UpdateClientOutput} from "../../src/application/dto/updateClientInputDTO";
import UpdateClientUseCase from "../../src/application/usecase/UpdateClientUseCase";

let factoryRepository: IRepositoryFactory;
let input = new UpdateClientInput('1', 'Juan', 'marechal', '11', '985691112', 'sabdd@gmail.com');

beforeEach(() => {
    factoryRepository = FactoryBuilder.getFactoryRepository();

} );

describe('deve testar o caso de uso de update de clients', () => {
    it('deve retornar um client atualizado', async () => {
        const useCase = new UpdateClientUseCase(factoryRepository);
        const outputOrError = await useCase.execute(input);
        expect(outputOrError.ok).toBe(true);
        const output = outputOrError.unwrap();
        expect(output).toBeInstanceOf(UpdateClientOutput);
        expect(output.id).toBe('1');
        expect(output.firstName).toBe('Juan');
        expect(output.lastName).toBe('marechal');
        expect(output.DDD).toBe('11');
        expect(output.number).toBe('985691112');
        expect(output.email).toBe('sabdd@gmail.com');


    } );

} );


