const {google} = require('googleapis');


export class CalendarEventReader {
    private calendarId: string;
    private API_KEY = 'AIzaSyBx4lbcO1WYmMSlz-Tlur4lecnUDtHkqhs';

    constructor(calendarId: string) {
        this.calendarId = calendarId;
   }

    async autenticate() {
        const auth = new google.auth.GoogleAuth({
            keyFile: './token.json',
            scopes: 'https://www.googleapis.com/auth/calendar.readonly',
        });
        google.options({auth});
    }


    async readEvents(): Promise<Event[]> {
        try {
            await this.autenticate();
            const calendar = google.calendar({version: 'v3'});
            const events = await calendar.events.list({
                calendarId: this.calendarId,
                timeMin: (new Date()).toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime',
            });
            return events.data.items;
        }
    }
}

const calendar = new CalendarEventReader('giorgeabdala@gmail.com');
calendar.readEvents().then((events) => console.log(events));


