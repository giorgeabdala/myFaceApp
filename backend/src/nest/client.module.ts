import { Module } from '@nestjs/common';
import { ClientController } from '../controller/client.controller';
import MemoryRepositoryFactory from "../infra/factory/MemoryRepositoryFactory";
import IRepositoryFactory from "../domain/factory/IRepositoryFactory";
import FactoryBuilder from "../infra/factory/FactoryBuilder";
import {repositoryFactory, repositoryFactoryTest} from "./global.module";




  @Module({
    controllers: [ClientController],
    providers: [repositoryFactory]


  })
  export class ClientModule {
  }



  @Module({
    controllers: [ClientController],
    providers: [repositoryFactoryTest]


  })

  export class ClientModuleTest {
  }
