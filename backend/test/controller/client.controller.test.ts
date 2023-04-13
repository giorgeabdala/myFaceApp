import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../../src/controller/client.controller';
import {CreateClientOutput} from "../../src/application/dto/createClientDTO";
import FindAllClientsOutput from "../../src/application/dto/findAllClientsOutput";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import {ClientModuleTest} from "../../src/nest/client.module";
import {UpdateClientOutput} from "../../src/application/dto/updateClientInputDTO";
import DeleteClientUseCase from "../../src/application/usecase/deleteClientUseCase";
import CreateClientUseCase from "../../src/application/usecase/createClientUseCase";
import {clientFakeController} from "../dataFake/dataFakeController";

let factoryRepository = FactoryBuilder.getTestsRepositoryFactory();


describe('ClientController', () => {
  let controller: ClientController;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [ClientModuleTest],

    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('Deve criar um cliente', async () => {
      const output = await controller.create(clientFakeController);
      expect(output.success).toBe(true);
      expect(output.body).toBeInstanceOf(CreateClientOutput);
      expect(output.body.firstName).toBe(clientFakeController.firstName);
      const deleteUsecase = new DeleteClientUseCase(factoryRepository);
      await deleteUsecase.execute(output.body.id);
    });

  it('Deve retornar um serverError ao cliar um cliente inválido', async () => {
      const newInput = {...clientFakeController, firstName: ""}
      const result = await controller.create(newInput);
      expect(result.success).toBeFalsy();
      expect(result.statusCode).toBe(400);
  } );

  it('Deve retornar todos os clients', async () => {
    const output = await controller.findAll();
      expect(output.success).toBe(true);
      expect(output.body).toBeInstanceOf(Array<FindAllClientsOutput>);
  } );

  it('Deve deletar um client', async () => {
      const createUsecase = new CreateClientUseCase(factoryRepository);
      const client = await (await createUsecase.execute(clientFakeController)).unwrap();
      const output = await controller.delete(client.id);
        expect(output.success).toBe(true);

  } );

  it('Deve atualizar um client', async () => {
      const createUsecase = new CreateClientUseCase(factoryRepository);
      const client = await (await createUsecase.execute(clientFakeController)).unwrap();
      const inputUpdate = {
            id: client.id,
            firstName: "updated",
            lastName: "updated",
            DDD: "41",
            phone: "999999999",
            email: "updated@gmail.com"
      }
      const output = await controller.update(inputUpdate);
      expect(output.success).toBe(true);
      expect(output.body).toBeInstanceOf(UpdateClientOutput);
      expect(output.body.firstName).toBe(inputUpdate.firstName);
      expect(output.body.lastName).toBe(inputUpdate.lastName);
      expect(output.body.DDD).toBe(inputUpdate.DDD);
      expect(output.body.phone).toBe(inputUpdate.phone);
      expect(output.body.email).toBe(inputUpdate.email);

      const deleteUsecase = new DeleteClientUseCase(factoryRepository);
      await deleteUsecase.execute(output.body.id);
} );

});

