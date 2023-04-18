import {Body, Controller, Get, Inject, Param} from '@nestjs/common';
import {badRequest, okHttp, serverError} from "../utils/helpers/http-helper";
import FindEventsCalendarByProfessionalDateUseCase, {FindEventsProfessionalInput} from "../application/usecase/findEventsCalendarByProfessionalDateUseCase";
import IGoogleCalendarService from "../domain/adapters/IGoogleCalendarService";
import IRepositoryFactory from "../domain/factory/IRepositoryFactory";

@Controller('googlecloud')
export class GoogleCalendarController {
  constructor(@Inject('IRepositoryFactory') readonly factoryRepository: IRepositoryFactory,
              @Inject('IGoogleCalendarService') readonly calendarService: IGoogleCalendarService) {}

  @Get(':findByProfessional')
  async findEventsByProfessional(@Body() input: FindEventsProfessionalInput) {
    try {
      const usecase = new FindEventsCalendarByProfessionalDateUseCase(this.factoryRepository,
          this.calendarService);
      const eventsOrError = await usecase.execute(input);
      if(eventsOrError.err) return badRequest(eventsOrError.val);
      return okHttp(eventsOrError.unwrap());

    } catch (err) {
      console.log(err);
      serverError('Internal Error: ' + err);
    }
  }

}
