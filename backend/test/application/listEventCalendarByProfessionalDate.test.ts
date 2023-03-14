import ListEventsCalendarByProfessionalDateUseCase, {ListEventsProfessionalInput} from "../../src/application/usecase/listEventsCalendarByProfessionalDateUseCase";
import GoogleCalendarService from "../../src/infra/service/googleCalendar/GoogleCalendarService";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import IGoogleCalendarService from "../../src/domain/adapters/IGoogleCalendarService";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";

let input: ListEventsProfessionalInput;
let googleService: IGoogleCalendarService;
let professionalRepository: IProfessionalRepository;
const factoryRepository = FactoryBuilder.getFactoryRepository();

beforeEach(() => {
    googleService = new GoogleCalendarService();
    professionalRepository =factoryRepository.getProfessionalRepository();
    const hoje = new Date();

    input = {
        professionalId: '1',
        date: '2023-03-08'
    }
} );


describe('Deve testar a busca de eventos na agenda do Google Calendar', () => {
    it('Deve retornar um Array com todos os eventos de um profissional em um dia', async () => {
        const usecase =  new ListEventsCalendarByProfessionalDateUseCase( factoryRepository,googleService  )
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

    it('Deve retornar Option.None quando não houver eventos', async () => {
        input = {
            professionalId: '1',
            date: '2023-03-03'
        }
        const usecase =  new ListEventsCalendarByProfessionalDateUseCase( factoryRepository,googleService  )
        const eventsOrError = await usecase.execute(input);
        expect(eventsOrError.ok).toBe(true);
        const events = eventsOrError.unwrap();
        expect(events).toBeInstanceOf(Array);
        console.log(events);
        expect(events.length).toBe(0);

    } );
} )