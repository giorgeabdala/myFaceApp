import {Option, Result} from 'ts-results';
import {calendar_v3} from "googleapis";
import Schema$Event = calendar_v3.Schema$Event;


export default interface IGoogleCalendarService {
    findEventByDate(professionalId: string, calendarId: string, date: string): Promise<Option<Schema$Event[]>>;
    requestAuthorization(professionalId: string): Promise<Result<string,string>>;
}