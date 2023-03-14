import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import {Err, Ok, Result} from "ts-results";
import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";

export type GoogleRequestUserConsentInput = {
    professionalId: string;
}

export type GoogleRequestUserConsentOutput = {
    token: string;
}

export default class GoogleRequestUserConsentUseCase {

    constructor(readonly userRequestService: IGoogleCalendarService) {}

    async execute(input: GoogleRequestUserConsentInput): Promise<Result<GoogleRequestUserConsentOutput, string>> {
        const authorizationToken = await this.userRequestService.requestAuthorization(input.professionalId);
        if(authorizationToken.err) return Err('Não foi possível obter o token de autorização');
        return Ok({token: authorizationToken.val});
    }
}


