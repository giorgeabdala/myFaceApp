import { Module } from '@nestjs/common';
import { GoogleCalendarController } from '../controller/googleCalendar.controller';

@Module({
  controllers: [GoogleCalendarController],
})
export class GoogleCalendarModule {}
