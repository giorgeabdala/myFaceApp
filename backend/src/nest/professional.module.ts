import { Module } from '@nestjs/common';
import { ProfessionalController } from '../controller/professional.controller';
import {repositoryFactory, repositoryFactoryTest} from "./global.module";

@Module({
  controllers: [ProfessionalController],
  providers: [repositoryFactory]
})
export class ProfessionalModule {}

@Module({
  controllers: [ProfessionalController],
  providers: [repositoryFactoryTest]
})
export class ProfessionalModuleTest {}
