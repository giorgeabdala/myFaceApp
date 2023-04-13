import mongoose, {Connection} from 'mongoose';
import IConnection from "../../../domain/adapters/IConnection";

export default class MongoDB implements IConnection {

    private static instance: MongoDB;

    //TODO: trocar para .env
    //private MONGODB_URI = 'mongodb://192.168.0.2:27017/myface';
    private MONGODB_URI = 'mongodb://localhost:27017/myface';
    //private MONGODB_URI = 'mongodb://mongo:27017/myface';

    private OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
      //user: DB_USER,
        // pass: DB_PASS// Maintain up to 10 socket connections
    };

    public static getInstance(): MongoDB {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
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

    public async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("MongoDB is disconnected");
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
}


