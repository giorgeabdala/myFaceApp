import {Controller, Get, Post, Body, Param, Delete, Inject, Patch} from '@nestjs/common';
import CreateClientUseCase from "../application/usecase/createClientUseCase";
import {CreateClientInput} from "../application/dto/createClientDTO";
import {badRequest, okHttp, serverError} from "../utils/helpers/http-helper";
import FindAllClientsUseCase from "../application/usecase/findAllClientsUseCase";
import DeleteClientUseCase from "../application/usecase/deleteClientUseCase";
import IRepositoryFactory from "../domain/factory/IRepositoryFactory";
import {UpdateClientInput} from "../application/dto/updateClientInputDTO";
import UpdateClientUseCase from "../application/usecase/UpdateClientUseCase";

@Controller('client')
export class ClientController {

    constructor(@Inject('IRepositoryFactory') readonly factoryRepository: IRepositoryFactory) {
    }

    @Post()
    async create(@Body() input: CreateClientInput) {
        try {
            const usecase = new CreateClientUseCase(this.factoryRepository);
            const outputOrError = await usecase.execute(input);
            if (outputOrError.err) return badRequest(outputOrError.val);
            return okHttp(outputOrError.unwrap());
        } catch (err) {
            console.log(err);
            return serverError('Internal Error: ' + err);
        }
    }

    @Get()
    async findAll() {
        try {
            const usecase = new FindAllClientsUseCase(this.factoryRepository);
            const outputOrError = await usecase.execute();
            if (outputOrError.err) return badRequest(outputOrError.val);
            return okHttp(outputOrError.unwrap());
        } catch (err) {
            console.log(err);
            return serverError('Internal Error: ' + err);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            const usecase = new DeleteClientUseCase(this.factoryRepository);
            const outputOrError = await usecase.execute(id);
            if (outputOrError.err) return badRequest(outputOrError.val);
            return okHttp(outputOrError.unwrap());
        } catch (err) {
            console.log(err);
            return serverError('Internal Error: ' + err);
        }
    }


  @Patch()
  async update(@Body() input: UpdateClientInput) {
    try {
      const usecase = new UpdateClientUseCase(this.factoryRepository);
      const outputOrError = await usecase.execute(input);
      if (outputOrError.err) return badRequest(outputOrError.val);
      return okHttp(outputOrError.unwrap());
    } catch (err) {
        console.log(err);
      return serverError('Internal Error: ' + err);
    }

  }


/*
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.clientService.findOne(+id);
    }



    */

}