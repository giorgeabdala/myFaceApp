import {Controller, Get, Post, Body, Param, Delete, Inject} from '@nestjs/common';
import CreateClientUseCase from "../application/usecase/createClientUseCase";
import {CreateClientInput} from "../application/dto/createClientDTO";
import FactoryBuilder from "../infra/factory/FactoryBuilder";
import {badRequest, okHttp, serverError} from "../utils/helpers/http-helper";
import FindAllClientsUseCase from "../application/usecase/findAllClientsUseCase";
import DeleteClientUseCase from "../application/usecase/deleteClientUseCase";
import IRepositoryFactory from "../domain/factory/IRepositoryFactory";

@Controller('client')
export class ClientController {

    constructor(@Inject('IRepositoryFactory') readonly factoryRepository: IRepositoryFactory) {
    }

    @Post()
    async create(@Body() createClientDto: CreateClientInput) {
        try {
            const usecase = new CreateClientUseCase(this.factoryRepository);
            const outputOrError = await usecase.execute(createClientDto);
            if (outputOrError.err) return badRequest(outputOrError.val);
            return okHttp(outputOrError.unwrap());
        } catch (err) {
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
            return serverError('Internal Error: ' + err);
        }
    }


    /*
      @Get(':id')f
      findOne(@Param('id') id: string) {
        return this.clientService.findOne(+id);
      }

      @Patch(':id')
      update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.update(+id, updateClientDto);
      }

      */

}