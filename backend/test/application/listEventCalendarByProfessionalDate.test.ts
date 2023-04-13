import FindEventsCalendarByProfessionalDateUseCase, {FindEventsProfessionalInput} from "../../src/application/usecase/findEventsCalendarByProfessionalDateUseCase";
import {IProfessionalRepository} from "../../src/domain/adapters/IProfessionalRepository";
import IGoogleCalendarService from "../../src/domain/adapters/IGoogleCalendarService";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import ServiceFactory from "../../src/infra/factory/ServiceFactory";
import {professionalFake} from "../dataFake/dateFake";


let input: FindEventsProfessionalInput;
let googleService: IGoogleCalendarService;
let professionalRepository: IProfessionalRepository;
const factoryRepository = FactoryBuilder.getMemoryRepositoryFactory();

beforeEach(() => {
    googleService = ServiceFactory.getGoogleCalendarService();
    professionalRepository =factoryRepository.getProfessionalRepository();
    const hoje = new Date();

    input = {
        professionalId: '10',
        date: '2023-03-08'
    }
} );


describe('Deve testar a busca de eventos na agenda do Google Calendar', () => {
    it('Deve retornar um Array com todos os eventos de um profissional em um dia', async () => {
        const professionalRepository = factoryRepository.getProfessionalRepository();
        await professionalRepository.save(professionalFake);

        const usecase =  new FindEventsCalendarByProfessionalDateUseCase( factoryRepository,googleService  )
        const eventsOrError = await usecase.execute(input);
        await professionalRepository.delete(professionalFake);

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
        const professionalRepository = factoryRepository.getProfessionalRepository();
        await professionalRepository.save(professionalFake);
        const newInput = {...input, date: '2023-03-03'};

        const usecase =  new FindEventsCalendarByProfessionalDateUseCase( factoryRepository,googleService  )
        const eventsOrError = await usecase.execute(newInput);
        await professionalRepository.delete(professionalFake);

        expect(eventsOrError.ok).toBe(true);
        const events = eventsOrError.unwrap();
        expect(events).toBeInstanceOf(Array);
        console.log(events);
        expect(events.length).toBe(0);

    } );
} )