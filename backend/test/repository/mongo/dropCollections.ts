import mongoose, {Connection} from 'mongoose';
import IConnection from "../../../src/domain/adapters/IConnection";


export default class DropCollection {

    private static instance: DropCollection;

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

    public static getInstance(): DropCollection {
        if (!DropCollection.instance) {
            DropCollection.instance = new DropCollection();
        }
        return DropCollection.instance;
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


    public async dropCollection(collectionName: string) {
        const db = await this.connect();
        await db.collection(collectionName).deleteMany({});
    }
}


const drop =  DropCollection.getInstance();



drop.dropCollection('professional').then(r => console.log(r));
drop.dropCollection('client').then(r => console.log(r));
drop.dropCollection('appointment').then(r => console.log(r));




