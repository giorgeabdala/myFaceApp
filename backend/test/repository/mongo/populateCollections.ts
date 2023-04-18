import 'dotenv/config';
import mongoose, {Connection} from 'mongoose';
import {Client} from "../../../src/domain/entities/client";
import {Professional} from "../../../src/domain/entities/professional";
import FactoryBuilder from "../../../src/infra/factory/FactoryBuilder";
import ClientSchema from "../../../src/infra/db/mongo/clientSchema";
import ProfessionalSchema from "../../../src/infra/db/mongo/professionalSchema";

const clientTest = Client.create("99", "client", "fake", "33", "333333333", "email2@email.com").unwrap();
const professionalTest = Professional.create('99',
    'teste',
    'testeLast',
    '11',
    '999999999',
    'email@gmail.com',
    'j2ialadmckmcdne2i7bmfvsovs@group.calendar.google.com').unwrap();



export default class PopulateCollections {

    private static instance: PopulateCollections;

    //TODO: trocar para .env
    private MONGODB_URI = 'mongodb://localhost:27017/myface';
    //private MONGODB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

    private OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        //user: DB_USER,
        // pass: DB_PASS// Maintain up to 10 socket connections
    };

    public static getInstance(): PopulateCollections {
        if (!PopulateCollections.instance) {
            PopulateCollections.instance = new PopulateCollections();
        }
        return PopulateCollections.instance;
    }


    public  async connect() : Promise<Connection> {
        await mongoose.connect(this.MONGODB_URI, this.OPTIONS);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log('connected to MongoDB database!');
        });

        return mongoose.connection;
    }



    public async populateCollection() {
        const db = await this.connect();
        const clientSchema = new ClientSchema();
        const clientModel = db.model('ClientSchema', clientSchema.getSchema(), 'client');
        const professionalSchema = new ProfessionalSchema();
        const professionalModel = db.model('ProfessionalSchema', professionalSchema.getSchema(), 'professional');

        await clientModel.create(clientSchema.getClientObject(clientTest));
        await professionalModel.create(professionalSchema.getProfessionalObject(professionalTest));


    }
}


const drop =  PopulateCollections.getInstance();



drop.populateCollection().then(r => console.log(r));








