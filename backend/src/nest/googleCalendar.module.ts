import { Module } from '@nestjs/common';
import { GoogleCalendarController } from '../controller/googleCalendar.controller';
import {googleCalendarService, repositoryFactory, repositoryFactoryTest} from "./global.module";

@Module({
  controllers: [GoogleCalendarController],
  providers: [repositoryFactory, googleCalendarService]
})
export class GoogleCalendarModule {}


@Module({
  controllers: [GoogleCalendarController],
  providers: [repositoryFactoryTest, googleCalendarService]
})
export class GoogleCalendarModuleTest {}
