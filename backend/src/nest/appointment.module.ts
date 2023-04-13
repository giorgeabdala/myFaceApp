import { Module } from '@nestjs/common';
import { AppointmentController } from '../controller/appointment.controller';
import {repositoryFactory, repositoryFactoryTest} from "./global.module";

@Module({
  controllers: [AppointmentController],
  providers: [repositoryFactory]
})
export class AppointmentModule {}


@Module({
  controllers: [AppointmentController],
  providers: [repositoryFactoryTest]
})
export class AppointmentModuleTest {}

