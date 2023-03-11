import {Professional} from "../../domain/entities/professional";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import {Err, Ok, Result} from "ts-results";
import path from "path";
import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";

const CREDENTIALS_PATH = path.join(__dirname, '../../credentials/google/google-app.json');
const  TOKEN_PATH = path.join(__dirname, '../../credentials/google/');

export type GoogleRequestUserConsentInput = {
    professionalId: string;
}

export type GoogleRequestUserConsentOutput = {
    token: string;
    fullPath: string;
    credentialsPath: string;
}

export default class GoogleRequestUserConsent {
    constructor(readonly professionalRepository: IProfessionalRepository, readonly userRequestService: IGoogleCalendarService) {}

    async execute(input: GoogleRequestUserConsentInput): Promise<Result<GoogleRequestUserConsentOutput, string>> {
        const tokenFullPath = TOKEN_PATH + input.professionalId + '.json';
        const authorizationToken = await this.userRequestService.requestAuthorization(CREDENTIALS_PATH, tokenFullPath);
        if(authorizationToken.err) return Err('Não foi possível obter o token de autorização');
        return Ok({token: authorizationToken.val, fullPath: tokenFullPath, credentialsPath: CREDENTIALS_PATH});
    }
}


