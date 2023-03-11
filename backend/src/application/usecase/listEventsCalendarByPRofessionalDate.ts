import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";
import {Err, Ok, Result} from "ts-results";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";

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
    constructor(readonly calendarService: IGoogleCalendarService, readonly professionalRepository: IProfessionalRepository) {}

    async execute(input: ListEventsProfessionalInput): Promise<Result<ListEventsProfessionalOutput[], string>> {
        const professional = await this.professionalRepository.findById(input.professionalId);
        const eventsOrNone =await this.calendarService.findEventByDate(professional.id, professional.calendarId, input.date);
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

