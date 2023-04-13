import { Test, TestingModule } from '@nestjs/testing';
import { GoogleCalendarController } from '../../src/controller/googleCalendar.controller';
import {FindEventsProfessionalInput} from "../../src/application/usecase/findEventsCalendarByProfessionalDateUseCase";
import {GoogleCalendarModuleTest} from "../../src/nest/googleCalendar.module";
import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import {Professional} from "../../src/domain/entities/professional";
import {professionalFakeCOntroller} from "../dataFake/dataFakeController";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";

let professionalRepository: IProfessionalRepository;

describe('GooglecloudController', () => {
  let controller: GoogleCalendarController;
  let factoryRepository: IRepositoryFactory;
  let professional : Professional;

  beforeEach(async () => {
    factoryRepository = FactoryBuilder.getTestsRepositoryFactory();
    professionalRepository = factoryRepository.getProfessionalRepository();
    professional = Professional.create(
        "10",
        professionalFakeCOntroller.firstName,
        professionalFakeCOntroller.lastName,
        professionalFakeCOntroller.DDD,
        professionalFakeCOntroller.phone,
        professionalFakeCOntroller.email,
        professionalFakeCOntroller.calendarId,
    ).unwrap();

    const module: TestingModule = await Test.createTestingModule({
      imports: [GoogleCalendarModuleTest]
    }).compile();

    controller = module.get<GoogleCalendarController>(GoogleCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar um array de eventos', async () => {

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

  afterEach(async () => {
    await professionalRepository.delete(professional);

  } );
});
