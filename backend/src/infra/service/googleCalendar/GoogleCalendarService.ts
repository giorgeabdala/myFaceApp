import {None, Option, Some} from "ts-results";
import {calendar_v3, google} from "googleapis";
import IGoogleCalendarService from "../../../domain/adapters/IGoogleCalendarService";
import Schema$Event = calendar_v3.Schema$Event;
import {Server} from "http";


const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export default class GoogleCalendarService implements IGoogleCalendarService {
    private calendar: calendar_v3.Calendar;

    constructor() {
        this.calendar = google.calendar({version: 'v3'});
    }

    private parseDate(str: string): Date {
        const [year, month, day] = str.split('-').map(Number);
        return new Date(year, month - 1, day);
    }


    public async findEventByDate(calendarId: string, date: string): Promise<Option<Schema$Event[]>> {
        await this.autenticate();
        const timeMin = this.parseDate(date);
        const nextDay = new Date(timeMin.getTime());
        nextDay.setDate(timeMin.getDate() + 1);
        const events = await this.calendar.events.list({
            calendarId: calendarId,
            timeMin: timeMin.toISOString(),
            timeMax: nextDay.toISOString(),
            maxResults: 100,
        });
        const eventsList = events.data.items;
        if(!eventsList) return None;
        return new Some(events.data.items);
    }


    private async autenticate() {
        const auth = new google.auth.GoogleAuth({
            keyFile: './src/infra/service/googleCalendar/token.json', scopes: SCOPES});
        google.options({auth});
    }

}