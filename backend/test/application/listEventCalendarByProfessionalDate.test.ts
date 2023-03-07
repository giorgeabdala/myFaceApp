import listEventsCalendarByProfessionalDate, {ListEventsProfessionalInput} from "../../src/application/usecase/listEventsCalendarByPRofessionalDate";
import dayjs from "dayjs";
import GoogleCalendarService from "../../src/infra/service/googleCalendar/GoogleCalendarService";

let input: ListEventsProfessionalInput;

beforeEach(() => {
    const hoje = new Date();

    input = {
        professionalId: 'j2ialadmckmcdne2i7bmfvsovs@group.calendar.google.com',
        date: '2023-03-08'
    }
} );


describe('Deve testar a busca de eventos na agenda do Google Calendar', () => {
    it('Deve retornar um Array com todos os eventos de um profissional em um dia', async () => {
        const usecase = await new listEventsCalendarByProfessionalDate(new GoogleCalendarService())
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