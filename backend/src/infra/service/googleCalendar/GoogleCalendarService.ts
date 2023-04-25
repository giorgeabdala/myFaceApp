import {Err, None, Ok, Option, Result, Some} from "ts-results";
import {calendar_v3, google} from "googleapis";
import IGoogleCalendarService from "../../../domain/adapters/IGoogleCalendarService";
import Schema$Event = calendar_v3.Schema$Event;
import {authenticate} from "@google-cloud/local-auth";
import {promises as fs} from "fs";
import dayjs from 'dayjs';
import settings from "./settings";




export default class GoogleCalendarService implements IGoogleCalendarService {
    private calendar: calendar_v3.Calendar;

    constructor() {
        this.calendar = google.calendar({version: 'v3'});
    }


    public async findEventByDate(professionalId: string, calendarId: string, date: string): Promise<Option<Schema$Event[]>> {
        const tokenFullPath = settings.TOKEN_PATH + professionalId + '.json';
        await this.autenticate(tokenFullPath);
        const timeMin  = dayjs(date).toDate();
        const nextDay = dayjs(date).add(1, 'day').toDate();
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

    public async requestAuthorization(professionalId: string): Promise<Result<string,string>>  {
        const tokenFullPath = settings.TOKEN_PATH + professionalId + '.json';
        const client = await authenticate({
            scopes: settings.SCOPES,
            keyfilePath: settings.CREDENTIALS_FULLPATH});
        if (!client.credentials) return new Err('Não foi possível obter as credenciais do usuário')
        await this.saveCredentials(settings.CREDENTIALS_FULLPATH, client.credentials.refresh_token, tokenFullPath);

        return new Ok(client.credentials.refresh_token);
    }

    private async saveCredentials(credentialsPath: string, refreshToken: string, tokenFullPath: string): Promise<Result<void, string>> {
        const content = await fs.readFile(credentialsPath);
        const keys = JSON.parse(content.toString());
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: refreshToken,
        });

        return new Ok( await fs.writeFile(tokenFullPath, payload));
    }

    private async autenticate(tokenFullPath: string) {
        const auth = new google.auth.GoogleAuth({
            keyFile: tokenFullPath, scopes: settings.SCOPES});
        google.options({auth});
    }




}