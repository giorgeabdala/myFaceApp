import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";
import {Ok, Result} from "ts-results";

export type ListEventsProfessionalInput = {
    professionalId: string;
    date: string; // YYYY-MM-DD
}

export type ListEventsProfessionalOutput = {
    id: string;
    clientName: string;
    startDateTime: string;
    endDateTime: string;
}

export default class listEventsCalendarByProfessionalDate {
    private output: ListEventsProfessionalOutput[] = [];
    constructor(private calendarService: IGoogleCalendarService) {}

    async execute(input: ListEventsProfessionalInput): Promise<Result<ListEventsProfessionalOutput[], string>> {
        const eventsOrNone =await this.calendarService.findByDate(input.professionalId, input.date);
        if (eventsOrNone.none) return new Ok(this.output);
        const events = eventsOrNone.unwrap();
        events.forEach(event => {
            const startDateTime = event.start?.dateTime;
            const endDateTime = event.end?.dateTime;
            if (!startDateTime || !endDateTime) return;
            this.output.push({
                id: event.id,
                clientName: event.summary || '',
                startDateTime: startDateTime,
                endDateTime: endDateTime
            })
        }
        );
        return new Ok(this.output);
    }
}

