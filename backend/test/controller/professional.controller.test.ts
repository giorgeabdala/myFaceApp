import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalController } from '../../src/controller/professional.controller';
import {CreateProfessionalInput, CreateProfessionalOutput} from "../../src/application/dto/createProfessionalDTO";
import {ProfessionalModuleTest} from "../../src/nest/professional.module";
import DeleteProfessionalUseCase from "../../src/application/usecase/deleteProfessionalUseCase";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import {CreateProfessionalUseCase} from "../../src/application/usecase/createProfessionalUseCase";
import {professionalFakeCOntroller} from "../dataFake/dataFakeController";

describe('ProfessionalController', () => {
  let controller: ProfessionalController;
  let factoryRepository: IRepositoryFactory;

  beforeEach(async () => {
      factoryRepository = FactoryBuilder.getTestsRepositoryFactory();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ProfessionalModuleTest],
    }).compile();

    controller = module.get<ProfessionalController>(ProfessionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve criar um professional', async () => {
    const output = await controller.create(professionalFakeCOntroller);
    expect(output.success).toBe(true);
    expect(output.body).toBeInstanceOf(CreateProfessionalOutput);
    const usecase = new DeleteProfessionalUseCase(factoryRepository);
    await usecase.execute(output.body.id);
    });

    it('Deve retornar um serverError ao criar um profissional inválido', async () => {
        const newInput = {...professionalFakeCOntroller, firstName: ""}
        const result = await controller.create(newInput);
        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(400);
    } );

    it('Deve deletar um professional', async () => {
        const useCase = new CreateProfessionalUseCase(factoryRepository);
        const client = await (await useCase.execute(professionalFakeCOntroller)).unwrap();
        const result = await controller.delete(client.id);
        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(200);
    } );

});
