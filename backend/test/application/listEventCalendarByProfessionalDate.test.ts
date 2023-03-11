import ListEventsCalendarByProfessionalDate, {ListEventsProfessionalInput} from "../../src/application/usecase/listEventsCalendarByPRofessionalDate";
import dayjs from "dayjs";
import GoogleCalendarService from "../../src/infra/service/googleCalendar/GoogleCalendarService";
import ProfessionalRepositoryMemory from "../../src/infra/repository/memory/ProfessionalRepositoryMemory";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import IGoogleCalendarService from "../../src/domain/adapters/IGoogleCalendarService";

let input: ListEventsProfessionalInput;
let googleService: IGoogleCalendarService;
let professionalRepository: IProfessionalRepository;

beforeEach(() => {
    googleService = new GoogleCalendarService();
    professionalRepository = new ProfessionalRepositoryMemory();
    const hoje = new Date();

    input = {
        professionalId: '1',
        date: '2023-03-08'
    }
} );


describe('Deve testar a busca de eventos na agenda do Google Calendar', () => {
    it('Deve retornar um Array com todos os eventos de um profissional em um dia', async () => {
        const usecase = await new ListEventsCalendarByProfessionalDate( googleService, professionalRepository )
        const eventsOrError = await usecase.execute(input);
        expect(eventsOrError.ok).toBe(true);
        expect(eventsOrError.unwrap()).toBeInstanceOf(Array);
        const events = eventsOrError.unwrap();
        expect(events.length).toBeGreaterThan(0);
        expect(events[0]).toHaveProperty('id');
        expect(events[0]).toHaveProperty('clientName');
        expect(events[0]).toHaveProperty('startDateTime');
        expect(events[0]).toHaveProperty('endDateTime');
        expect(events[0].id).toBeTruthy();

    });
} );