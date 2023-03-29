//singleton para retornar uma instancia de conexão com o banco de dados mongodb

import * as mongoose from 'mongoose';

export default class MongoConnection {

    private static instance: MongoConnection;
    private static MONGODB_URI = 'mongodb://localhost:27017/myface';

    private constructor() {
        this.connect();
    }

    public static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }

    private connect() {
        const options = {
            useNewUrlParser: true,
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
        };

        const connectWithRetry = () => {
            console.log('MongoDB connection with retry');
            mongoose
                .connect(MongoConnection.MONGODB_URI, options)
                .then(() => {
                    console.log('MongoDB is connected');
                })
                .catch((err) => {
                    console.log('MongoDB connection unsuccessful, retry after 2 seconds.', err);
                    setTimeout(connectWithRetry, 2000);
                });
        };
        connectWithRetry();
    }
}

