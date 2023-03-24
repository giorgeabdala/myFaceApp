import { Test, TestingModule } from '@nestjs/testing';
import { GoogleCalendarController } from '../../src/controller/googleCalendar.controller';
import {FindEventsProfessionalInput} from "../../src/application/usecase/findEventsCalendarByProfessionalDateUseCase";
import {GoogleCalendarModule} from "../../src/nest/googleCalendar.module";

describe('GooglecloudController', () => {
  let controller: GoogleCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GoogleCalendarModule]
    }).compile();

    controller = module.get<GoogleCalendarController>(GoogleCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar um array de eventos', async () => {
    const input: FindEventsProfessionalInput = {
      professionalId: '1',
      date: '2023-03-08'
    }

    const result = await controller.findEventsByProfessional(input);
    expect(result.statusCode).toBe(200);
    expect(result.success).toBe(true);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body.length).toBeGreaterThan(0);
  });
});
