import { Module } from '@nestjs/common';
import { GooglecloudService } from './googlecloud.service';
import { GoogleCalendarController } from '../controller/googleCalendar.controller';

@Module({
  controllers: [GoogleCalendarController],
  providers: [GooglecloudService]
})
export class GoogleCalendarModule {}
