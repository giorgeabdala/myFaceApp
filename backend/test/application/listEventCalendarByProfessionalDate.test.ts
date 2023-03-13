import ListEventsCalendarByProfessionalDate, {ListEventsProfessionalInput} from "../../src/application/usecase/listEventsCalendarByPRofessionalDate";
import GoogleCalendarService from "../../src/infra/service/googleCalendar/GoogleCalendarService";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import IGoogleCalendarService from "../../src/domain/adapters/IGoogleCalendarService";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

let input: ListEventsProfessionalInput;
let googleService: IGoogleCalendarService;
let professionalRepository: IProfessionalRepository;
const factoryRepository = new MemoryRepositoryFactory();

beforeEach(() => {
    googleService = new GoogleCalendarService();
    professionalRepository =factoryRepository.createProfessionalRepository();
    const hoje = new Date();

    input = {
        professionalId: '1',
        date: '2023-03-08'
    }
} );


describe('Deve testar a busca de eventos na agenda do Google Calendar', () => {
    it('Deve retornar um Array com todos os eventos de um profissional em um dia', async () => {
        const usecase =  new ListEventsCalendarByProfessionalDate( factoryRepository,googleService  )
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