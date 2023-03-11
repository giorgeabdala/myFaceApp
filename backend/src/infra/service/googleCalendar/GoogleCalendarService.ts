import {Err, None, Ok, Option, Result, Some} from "ts-results";
import {calendar_v3, google} from "googleapis";
import IGoogleCalendarService from "../../../domain/adapters/IGoogleCalendarService";
import Schema$Event = calendar_v3.Schema$Event;
import {authenticate} from "@google-cloud/local-auth";
import {promises as fs} from "fs";
import dayjs from 'dayjs';


const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export default class GoogleCalendarService implements IGoogleCalendarService {
    private calendar: calendar_v3.Calendar;

    constructor() {
        this.calendar = google.calendar({version: 'v3'});
    }


    public async findEventByDate(calendarId: string, date: string, tokenFullPath: string): Promise<Option<Schema$Event[]>> {
        await this.autenticate(tokenFullPath);
        const timeMin = dayjs(date).toDate();
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

    public async requestAuthorization(credentialsPath: string, tokenPath: string): Promise<Result<string,string>>  {
        const client = await authenticate({
            scopes: SCOPES,
            keyfilePath: credentialsPath});
        if (!client.credentials) return new Err('Não foi possível obter as credenciais do usuário')
        await this.saveCredentials(credentialsPath, client.credentials.refresh_token, tokenPath);

        return new Ok(client.credentials.refresh_token);
    }

    private async saveCredentials(credentialsPath: string, refreshToken: string, tokenPath: string): Promise<Result<void, string>> {
        const content = await fs.readFile(credentialsPath);
        const keys = JSON.parse(content.toString());
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: refreshToken,
        });

        return new Ok( await fs.writeFile(tokenPath, payload));
    }

    private async autenticate(tokenFullPath: string) {
        const auth = new google.auth.GoogleAuth({
            keyFile: tokenFullPath, scopes: SCOPES});
        google.options({auth});
    }


}