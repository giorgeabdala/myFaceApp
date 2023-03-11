import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";
import {Err, Ok, Result} from "ts-results";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import path from "path";

const  TOKEN_PATH = path.join(__dirname, '../../credentials/google/');

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
        const tokenFullPath = TOKEN_PATH  + professional.id + '.json';
        const eventsOrNone =await this.calendarService.findEventByDate(professional.calendarId, input.date, tokenFullPath);
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

