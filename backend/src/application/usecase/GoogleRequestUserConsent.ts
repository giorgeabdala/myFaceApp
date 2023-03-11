import {Professional} from "../../domain/entities/professional";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import {Err, Ok, Result} from "ts-results";
import path from "path";
import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";



export type GoogleRequestUserConsentInput = {
    professionalId: string;
}

export type GoogleRequestUserConsentOutput = {
    token: string;
}

export default class GoogleRequestUserConsent {
    constructor(readonly professionalRepository: IProfessionalRepository, readonly userRequestService: IGoogleCalendarService) {}

    async execute(input: GoogleRequestUserConsentInput): Promise<Result<GoogleRequestUserConsentOutput, string>> {
        const authorizationToken = await this.userRequestService.requestAuthorization(input.professionalId);
        if(authorizationToken.err) return Err('Não foi possível obter o token de autorização');
        return Ok({token: authorizationToken.val});
    }
}


