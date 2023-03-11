import path from "path";


const settings = {
    SCOPES: "https://www.googleapis.com/auth/calendar.readonly",
    CREDENTIALS_FULLPATH: path.join(__dirname,  '../../../credentials/google/google-app.json'),
    TOKEN_PATH: path.join(__dirname, '../../../credentials/google/')
}

export default settings;

