import { Module } from '@nestjs/common';
import { GoogleCalendarController } from '../controller/googleCalendar.controller';
import {googleCalendarService, repositoryFactory} from "./global.module";

@Module({
  controllers: [GoogleCalendarController],
  providers: [repositoryFactory, googleCalendarService]
})
export class GoogleCalendarModule {}
