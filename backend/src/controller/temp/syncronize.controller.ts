import {Controller, Post, Body,Inject} from '@nestjs/common';
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import SyncronizeUseCase, {SyncronizeInput} from "../../application/usecase/temp/SyncronizeUseCase";
import {badRequest, okHttp, serverError} from "../../utils/helpers/http-helper";
import ServiceFactory from "../../infra/factory/ServiceFactory";

@Controller('syncronize')
export class SyncronizeController {

    constructor(@Inject('ServiceFactory') readonly serviceFactory: ServiceFactory,
                @Inject('IRepositoryFactory') readonly factoryRepository: IRepositoryFactory) {
    }

    @Post()
    async run(@Body() input: SyncronizeInput) {
        try {
            const usecase = new SyncronizeUseCase(this.factoryRepository, this.serviceFactory);
            const outputOrError = await usecase.execute(input);
            if (outputOrError.err) return badRequest(outputOrError.val);
            return okHttp(outputOrError.unwrap());
        } catch (err) {
            console.log(err);
            serverError('Internal Error: ' + err);
        }
    }

}