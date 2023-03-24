import { Module } from '@nestjs/common';
import { ClientController } from '../controller/client.controller';
import MemoryRepositoryFactory from "../infra/factory/MemoryRepositoryFactory";
import IRepositoryFactory from "../domain/factory/IRepositoryFactory";
import FactoryBuilder from "../infra/factory/FactoryBuilder";
import {repositoryFactory} from "./global.module";




@Module({
  controllers: [ClientController],
    providers: [repositoryFactory]


})
export class ClientModule {}
