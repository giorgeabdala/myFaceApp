import { Module } from '@nestjs/common';
import { AppointmentController } from '../controller/appointment.controller';

@Module({
  controllers: [AppointmentController],
})
export class AppointmentModule {}
