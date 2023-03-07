import { Option} from 'ts-results';
import {calendar_v3} from "googleapis";
import Schema$Event = calendar_v3.Schema$Event;


export default interface IGoogleCalendarService {
    findByDate(calendarId: string, date: string): Promise<Option<Schema$Event[]>>;
}