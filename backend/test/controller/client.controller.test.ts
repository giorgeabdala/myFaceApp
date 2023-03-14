import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../../src/controller/client.controller';

describe('ClientController', () => {
  let controller: ClientController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
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
     const result = await controller.create(input);
    expect(result.success).toBeTruthy();
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
    const result = await controller.findAll();
    console.log(result);
    expect(result.success).toBeTruthy();
  } );

});

