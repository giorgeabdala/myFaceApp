import {Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException} from '@nestjs/common';

import CreateClientUseCase from "../application/usecase/createClientUseCase";
import {CreateClientInput} from "../application/dto/createClientDTO";
import FactoryBuilder from "../infra/factory/FactoryBuilder";
import {badRequest, HttpResponse, ok, serverError} from "../utils/helpers/http-helper";
import FindAllClientsUseCase from "../application/usecase/findAllClientsUseCase";

@Controller('client')
export class ClientController {
  constructor(readonly factoryRepository = FactoryBuilder.getFactoryRepository()) {}

  @Post()
  async create(@Body() createClientDto: CreateClientInput) {
    try {
      const usecase = new CreateClientUseCase(this.factoryRepository);
      const outputOrError = await usecase.execute(createClientDto);
      if (outputOrError.err)  return  badRequest(outputOrError.val);
      return ok(outputOrError.unwrap());
    }
    catch (err) {
     return serverError('Internal Error: ' + err);
    }
  }

  @Get()
  async findAll() {
    try {
        const usecase = new FindAllClientsUseCase(this.factoryRepository);
        const outputOrError = await usecase.execute();
        if (outputOrError.err)  return  badRequest(outputOrError.val);
        return ok(outputOrError.unwrap());
    }
    catch (err) {
        return serverError('Internal Error: ' + err);
    }
  }
/*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }*/
}
