import { Module } from '@nestjs/common';
import { AppointmentController } from '../controller/appointment.controller';
import {repositoryFactory} from "./global.module";

@Module({
  controllers: [AppointmentController],
  providers: [repositoryFactory]
})
export class AppointmentModule {}
