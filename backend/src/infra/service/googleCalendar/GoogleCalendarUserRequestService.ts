import {authenticate} from "@google-cloud/local-auth";
import {Err, Ok, Result} from "ts-results";
import {promises as fs} from "fs";
import {Auth, google} from "googleapis";
const OAuth2 = google.auth.OAuth2

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';


export default class GoogleCalendarUserRequestService {

    public async requestAuthorization(credentialsPath: string, tokenPath: string): Promise<Result<string,string>>  {
        const client = await authenticate({
            scopes: SCOPES,
            keyfilePath: credentialsPath});
        if (!client.credentials) return new Err('Não foi possível obter as credenciais do usuário')
        await this.saveCredentials(credentialsPath, client.credentials.refresh_token, tokenPath);

        return new Ok(client.credentials.refresh_token);
    }


    public async saveCredentials(credentialsPath: string, refreshToken: string, tokenPath: string): Promise<Result<void, string>> {
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

}