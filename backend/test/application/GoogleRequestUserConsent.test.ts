import GoogleRequestUserConsentUseCase, {
} from "../../src/application/usecase/GoogleRequestUserConsentUseCase";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import { describe } from 'vitest'
import {Ok, Result} from "ts-results";
import IGoogleCalendarService from "../../src/domain/adapters/IGoogleCalendarService";
import settings from "../../src/infra/service/googleCalendar/settings";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import ServiceFactory from "../../src/infra/factory/ServiceFactory";

const factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();
let professionalRepository: IProfessionalRepository;
let userRequestService : IGoogleCalendarService;

beforeEach(() => {
    //definir timeout ppara 5 minutos
    professionalRepository = factoryRepository.getProfessionalRepository();

    userRequestService = ServiceFactory.getGoogleCalendarService();
    //mock do servico
    userRequestService = <IGoogleCalendarService>{requestAuthorization: async (credentialsPath: string, tokenPath: string): Promise<Result<string, string>> => {return Ok('token');}}
} );

describe('Deve testar a solicitação de acesso ao Google Calendar', () => {
    it ('Deve pegar a autorização do usuário e salvar o token',  async () => {
        const input = {professionalId: '1',}
        const usecase = new GoogleRequestUserConsentUseCase(userRequestService);
        const response = await usecase.execute(input);
        expect(response.ok).toBe(true);
        const output = response.unwrap();
        expect(output.token).not.toBe(null);
        expect(output.token.length).toBeGreaterThan(0);
    }, 200000);


    it('Deve carregar o token do arquivo', async () => {
        const professionalId = '1';
        const tokenFullPath = settings.TOKEN_PATH + professionalId + '.json';
        const regex=  /\/credentials\/google\/.*\.json/;
        expect(tokenFullPath).toMatch(regex);
        expect(settings.CREDENTIALS_FULLPATH).toMatch(regex);

    } );
});





