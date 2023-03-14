import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import FactoryBuilder from "../infra/factory/FactoryBuilder";
import {CreateProfessionalInput} from "../application/dto/createProfessionalDTO";
import {CreateProfessionalUseCase} from "../application/usecase/createProfessionalUseCase";
import {badRequest, ok, serverError} from "../utils/helpers/http-helper";
import FindAppointmentByClientUseCase from "../application/usecase/findAppointmentByClient";


@Controller('professional')
export class ProfessionalController {
  constructor(readonly factoryRepository = FactoryBuilder.getFactoryRepository()) {}

  @Post()
  async create(@Body() input: CreateProfessionalInput) {
    try {
      const usecase = new CreateProfessionalUseCase(this.factoryRepository);
      const professionalOrError = await usecase.execute(input);
      if(professionalOrError.err) return badRequest(professionalOrError.val);
      return ok(professionalOrError.unwrap());
    } catch (err) {
        return serverError('Internal Error: ' + err);
    }
  }

/*  @Get()
  findAll() {
    return this.professionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalService.update(+id, updateProfessionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalService.remove(+id);
  }*/
}
