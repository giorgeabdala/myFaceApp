import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../../src/controller/client.controller';
import {CreateClientOutput} from "../../src/application/dto/createClientDTO";
import FindAllClientsOutput from "../../src/application/dto/findAllClientsOutput";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import {ClientModule} from "../../src/nest/client.module";
import {UpdateClientOutput} from "../../src/application/dto/updateClientInputDTO";

describe('ClientController', () => {
  let controller: ClientController;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [ClientModule],

    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve criar um cliente', async () => {
    const input  = {
        firstName: "Giorge",
        lastName: "Silva",
        DDD: "11",
        number: "999999999",
        email: "joao@gmail.com"
    }
    const output = await controller.create(input);
    expect(output.success).toBe(true);
    expect(output.body).toBeInstanceOf(CreateClientOutput);

    });

  it('Deve retornar um serverError ao cliar um cliente inválido', async () => {
    const input  = {
        firstName: "",
        lastName: "Silva",
        DDD: "11",
        number: "999999999",
        email: "giorge@gmail.cm"
    }
    const result = await controller.create(input);
    expect(result.success).toBeFalsy();
    expect(result.statusCode).toBe(400);
  } );

  it('Deve retornar todos os clients', async () => {
    const output = await controller.findAll();
      expect(output.success).toBe(true);
      expect(output.body).toBeInstanceOf(Array<FindAllClientsOutput>);
  } );

  it('Deve deletar um client', async () => {
      const output = await controller.delete('1');
        expect(output.success).toBe(true);

  } );

  it('Deve atualizar um client', async () => {
      const input = {
          id: "2",
          firstName: "Joao",
          lastName: "Silva",
          DDD: "12",
          number: "999999999",
          email: "sabado@gmail.com"
        }
        const output = await controller.update(input);
    expect(output.success).toBe(true);
    expect(output.body).toBeInstanceOf(UpdateClientOutput);
    expect(output.body.firstName).toBe("Joao");
    expect(output.body.lastName).toBe("Silva");
    expect(output.body.DDD).toBe("12");
    expect(output.body.number).toBe("999999999");
    expect(output.body.email).toBe("sabado@gmail.com");
} );





});

