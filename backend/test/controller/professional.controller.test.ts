import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalController } from '../../src/controller/professional.controller';
import {CreateProfessionalInput, CreateProfessionalOutput} from "../../src/application/dto/createProfessionalDTO";


describe('ProfessionalController', () => {
  let controller: ProfessionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalController],
    }).compile();

    controller = module.get<ProfessionalController>(ProfessionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve criar um professoinal', async () => {
    const input : CreateProfessionalInput = {
        firstName: 'João',
        lastName: 'Silva',
        DDD: '11',
        number: '999999999',
        email: 'joao@gmail.com',
    };
    const output = await controller.create(input);
    expect(output.success).toBe(true);
    expect(output.body).toBeInstanceOf(CreateProfessionalOutput);
    });

    it('Deve retornar um serverError ao criar um profissional inválido', async () => {
        const input  = {
            firstName: "",
            lastName: "Silva",
            DDD: "11",
            number: "999999999",
            email: "m@gmail.com"

    }
    const result = await controller.create(input);
    expect(result.success).toBeFalsy();
    expect(result.statusCode).toBe(400);
    } );

});
