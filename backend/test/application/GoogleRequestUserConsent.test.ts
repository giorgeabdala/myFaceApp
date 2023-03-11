//pega a autorizacao do usuario ao google calendar

import GoogleRequestUserConsent, {
    GoogleRequestUserConsentInput
} from "../../src/application/usecase/GoogleRequestUserConsent";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import ProfessionalRepositoryMemory from "../../src/infra/repository/memory/ProfessionalRepositoryMemory";
import { describe, test } from 'vitest'
import {Ok, Result} from "ts-results";
import { vi } from 'vitest'
import IGoogleCalendarService from "../../src/domain/adapters/IGoogleCalendarService";
import GoogleCalendarService from "../../src/infra/service/googleCalendar/GoogleCalendarService";

let professionalRepository: IProfessionalRepository;
let userRequestService : IGoogleCalendarService;

beforeEach(() => {
    //definir timeout ppara 5 minutos
    professionalRepository = new ProfessionalRepositoryMemory();

    userRequestService = new GoogleCalendarService();
    userRequestService = <IGoogleCalendarService>{
        requestAuthorization: async (credentialsPath: string, tokenPath: string): Promise<Result<string, string>> => {
            return Ok('token');
        }
    }
} );

describe('Deve testar a solicitação de acesso ao Google Calendar', () => {
    it ('Deve pegar a autorização do usuário e salvar o token',  async () => {
        const input = {professionalId: '1',}
        const usecase = new GoogleRequestUserConsent(professionalRepository, userRequestService);
        const response = await usecase.execute(input);
        expect(response.ok).toBe(true);
        const output = response.unwrap();

        expect(output.token).not.toBe(null);
        expect(output.fullPath).not.toBe(null);
        expect(output.credentialsPath).not.toBe(null);
        expect(output.token.length).toBeGreaterThan(0);
        expect(output.fullPath.length).toBeGreaterThan(0);
        expect(output.credentialsPath.length).toBeGreaterThan(0);

        const regex=  /\/credentials\/google\/.*\.json/;
        expect(output.fullPath).toMatch(regex);
        expect(output.credentialsPath).toMatch(regex);
    }, 200000);
});





