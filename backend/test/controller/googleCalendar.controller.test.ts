import { Test, TestingModule } from '@nestjs/testing';
import { GoogleCalendarController } from '../../src/controller/googleCalendar.controller';
import {FindEventsProfessionalInput} from "../../src/application/usecase/findEventsCalendarByProfessionalDateUseCase";
import {GoogleCalendarModuleTest} from "../../src/nest/googleCalendar.module";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import {Professional} from "../../src/domain/entities/professional";
import {professionalFakeCOntroller} from "../dataFake/dataFakeController";

describe('GooglecloudController', () => {
  let controller: GoogleCalendarController;
  let factoryRepository: IRepositoryFactory;

  beforeEach(async () => {
    factoryRepository = FactoryBuilder.getTestsRepositoryFactory();

    const module: TestingModule = await Test.createTestingModule({
      imports: [GoogleCalendarModuleTest]
    }).compile();

    controller = module.get<GoogleCalendarController>(GoogleCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar um array de eventos', async () => {
    const professionalRepository = factoryRepository.getProfessionalRepository();
    const professional = Professional.create(
        "10",
        professionalFakeCOntroller.firstName,
        professionalFakeCOntroller.lastName,
        professionalFakeCOntroller.DDD,
        professionalFakeCOntroller.phone,
        professionalFakeCOntroller.email,
        professionalFakeCOntroller.calendarId,
    ).unwrap();
    await professionalRepository.save(professional);

    const input: FindEventsProfessionalInput = {
      professionalId: "10",
      date: '2023-03-08'
    }
    const result = await controller.findEventsByProfessional(input);
    await professionalRepository.delete(professional);

    expect(result.statusCode).toBe(200);
    expect(result.success).toBe(true);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body.length).toBeGreaterThan(0);


  });
});
