
describe('Deve testar a busca de eventos na agenda do Google Calendar', () => {
    it('Deve retornar um Array com todos os eventos de um profissional em um dia', async () => {
        const usecase = new listEventsCalendarByProfessionalDate(new GoogleCalendarService())
}