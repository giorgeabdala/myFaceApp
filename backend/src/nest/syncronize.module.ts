import { Module } from '@nestjs/common';
import {repositoryFactory, repositoryFactoryTest, serviceFactory} from "./global.module";
import {SyncronizeController} from "../controller/temp/syncronize.controller";

  @Module({
    controllers: [SyncronizeController],
    providers: [serviceFactory, repositoryFactory]
  })
  export class SyncronizeModule {}

  @Module({
    controllers: [SyncronizeController],
    providers: [serviceFactory, repositoryFactoryTest]
  })

  export class SyncronizeModuleTest {
  }
