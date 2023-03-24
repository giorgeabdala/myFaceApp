import { Module } from '@nestjs/common';
import {ClientModule} from "./client.module";
import {ProfessionalModule} from "./professional.module";
import {AppointmentModule} from "./appointment.module";
import {GoogleCalendarModule} from "./googleCalendar.module";
import {PhoneNotificationModule} from "./phone-notification.module";


@Module({
  imports: [ClientModule, ProfessionalModule, AppointmentModule, GoogleCalendarModule, PhoneNotificationModule],
})
export class AppModule {}
