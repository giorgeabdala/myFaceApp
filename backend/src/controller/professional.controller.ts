import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import {CreateProfessionalInput} from "../application/dto/createProfessionalDTO";
import {CreateProfessionalUseCase} from "../application/usecase/createProfessionalUseCase";
import {badRequest, okHttp, serverError} from "../utils/helpers/http-helper";
import DeleteProfessionalUseCase from "../application/usecase/deleteProfessionalUseCase";
import IRepositoryFactory from "../domain/factory/IRepositoryFactory";


@Controller('professional')
export class ProfessionalController {
  constructor(@Inject('IRepositoryFactory') readonly factoryRepository: IRepositoryFactory) {}

  @Post()
  async create(@Body() input: CreateProfessionalInput) {
    try {
      const usecase = new CreateProfessionalUseCase(this.factoryRepository);
      const professionalOrError = await usecase.execute(input);
      if(professionalOrError.err) return badRequest(professionalOrError.val);
      return okHttp(professionalOrError.unwrap());
    } catch (err) {
        console.log(err);
        serverError('Internal Error: ' + err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
        const usecase = new DeleteProfessionalUseCase(this.factoryRepository);
        const result = await usecase.execute(id);
        if(result.err) return badRequest(result.val);
        return okHttp(result);
    } catch (err) {
        console.log(err);
        serverError('Internal Error: ' + err);
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

*/
}
