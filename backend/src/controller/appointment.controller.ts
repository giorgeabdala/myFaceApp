import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import FactoryBuilder from "../infra/factory/FactoryBuilder";
import {CreateAppointmentInput} from "../application/dto/createAppointmentDTO";
import CreateAppointmentUseCase from "../application/usecase/createAppointmentUseCase";
import {badRequest, ok, serverError} from "../utils/helpers/http-helper";
import FindAppointmentByClientUseCase from "../application/usecase/findAppointmentByClient";
import {UpdateAppointmentInput} from "../application/dto/updateAppointmentDTO";
import UpdateAppointmentUseCase from "../application/usecase/updateAppointmentUseCase";

@Controller('appointment')
export class AppointmentController {
  constructor(readonly factoryRepository = FactoryBuilder.getFactoryRepository()) {}

  @Post()
  async create(@Body() input: CreateAppointmentInput) {
    try {
      const usecase = new CreateAppointmentUseCase(this.factoryRepository);
      const appointmentOrError = await usecase.execute(input);
      if(appointmentOrError.err) return badRequest(appointmentOrError.val);
      return ok(appointmentOrError.unwrap());
    }
    catch (err) {
        return serverError('Internal Error: ' + err);
    }
  }

  @Get(':findByClient')
  async findByClient(@Param('clientId') id: string) {
    try {
      const usecase = new FindAppointmentByClientUseCase(this.factoryRepository);
      const appointmentOrError = await usecase.execute(id);
      if(appointmentOrError.err) return badRequest(appointmentOrError.val);
      return ok(appointmentOrError.unwrap());
    } catch (err) {
      return serverError('Internal Error: ' + err);
    }
  }

  @Get(':findByProfessional')
    async findByProfessional(@Param('professionalId') id: string) {
    try {
            const usecase = new FindAppointmentByClientUseCase(this.factoryRepository);
            const appointmentOrError = await usecase.execute(id);
            if(appointmentOrError.err) return badRequest(appointmentOrError.val);
            return ok(appointmentOrError.unwrap());
        } catch (err) {
            return serverError('Internal Error: ' + err);
        }
  }

  @Patch(':id')
  async update(@Body() input: UpdateAppointmentInput) {
      try {
            const usecase = new UpdateAppointmentUseCase(this.factoryRepository);
            const appointmentOrError = await usecase.execute( input);
            if(appointmentOrError.err) return badRequest(appointmentOrError.val);
            return ok(appointmentOrError.unwrap());
      } catch (err) {
            return serverError('Internal Error: ' + err);
      }
  }

/*  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }*/
}
