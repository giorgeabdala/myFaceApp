import {Body, Controller, Get, Param} from '@nestjs/common';
import FactoryBuilder from "../infra/factory/FactoryBuilder";
import {badRequest, ok, serverError} from "../utils/helpers/http-helper";
import FindEventsCalendarByProfessionalDateUseCase, {FindEventsProfessionalInput} from "../application/usecase/findEventsCalendarByProfessionalDateUseCase";
import IGoogleCalendarService from "../domain/adapters/IGoogleCalendarService";
import ServiceFactory from "../infra/factory/ServiceFactory";

@Controller('googlecloud')
export class GoogleCalendarController {
  constructor(readonly factoryRepository = FactoryBuilder.getFactoryRepository(),
              readonly calendarService: IGoogleCalendarService = ServiceFactory.getGoogleCalendarService()) {}

  @Get(':findByProfessional')
  async findEventsByProfessional(@Body() input: FindEventsProfessionalInput) {
    try {
      const usecase = new FindEventsCalendarByProfessionalDateUseCase(this.factoryRepository,
          this.calendarService);
      const eventsOrError = await usecase.execute(input);
      if(eventsOrError.err) return badRequest(eventsOrError.val);
      return ok(eventsOrError.unwrap());

    } catch (err) {
      return serverError('Internal Error: ' + err);
    }
  }

}
