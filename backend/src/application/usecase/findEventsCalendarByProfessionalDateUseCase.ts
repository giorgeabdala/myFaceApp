import IGoogleCalendarService from "../../domain/adapters/IGoogleCalendarService";
import {Ok, Result} from "ts-results";
import {IProfessionalRepository} from "../../domain/adapters/IProfessionalRepository";
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";

export type FindEventsProfessionalInput = {
    professionalId: string;
    date: string; // YYYY-MM-DD
}

export type FindEventsProfessionalOutput = {
    id: string;
    clientName: string;
    startDateTime: string;
    endDateTime: string;
}

export default class FindEventsCalendarByProfessionalDateUseCase {
    private professionalRepository: IProfessionalRepository = this.factoryRepository.getProfessionalRepository();
    private output: FindEventsProfessionalOutput[] = [];

    constructor(readonly factoryRepository: IRepositoryFactory, readonly calendarService: IGoogleCalendarService) {
        this.professionalRepository = factoryRepository.getProfessionalRepository();
    }

    async execute(input: FindEventsProfessionalInput): Promise<Result<FindEventsProfessionalOutput[], string>> {
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

