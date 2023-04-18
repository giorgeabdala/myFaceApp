import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalController } from '../../src/controller/professional.controller';
import {CreateProfessionalInput, CreateProfessionalOutput} from "../../src/application/dto/createProfessionalDTO";
import {ProfessionalModuleTest} from "../../src/nest/professional.module";
import DeleteProfessionalUseCase from "../../src/application/usecase/deleteProfessionalUseCase";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import {CreateProfessionalUseCase} from "../../src/application/usecase/createProfessionalUseCase";
import {professionalFakeCOntroller} from "../dataFake/dataFakeController";

//id para deletar
let id: string;


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
    id = output.body.id;
    expect(output.success).toBe(true);
    expect(output.body).toBeInstanceOf(CreateProfessionalOutput);
    const usecase = new DeleteProfessionalUseCase(factoryRepository);
    await usecase.execute(output.body.id);
    });

    it('Deve retornar um serverError ao criar um profissional inválido', async () => {
        const newInput = {...professionalFakeCOntroller, firstName: ""}
        await expect(controller.create(newInput)).rejects.toThrow();
    } );

    it('Deve deletar um professional', async () => {
        const useCase = new CreateProfessionalUseCase(factoryRepository);
        const client = await (await useCase.execute(professionalFakeCOntroller)).unwrap();
        id = client.id;
        const result = await controller.delete(client.id);
        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(200);
    } );

    afterEach(async () => {
        const usecase = new DeleteProfessionalUseCase(factoryRepository);
        await usecase.execute(id);
    } );

});
