import * as mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/myface';

export async function connect(app: any) {
    const options = {
        useNewUrlParser: true,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    const connectWithRetry = () => {
        console.log('MongoDB connection with retry');
        mongoose
            .connect(MONGODB_URI, options)
            .then(() => {
                console.log('MongoDB is connected');
                app.emit('ready');
            })
            .catch((err) => {
                console.log('MongoDB connection unsuccessful, retry after 2 seconds.', err);
                setTimeout(connectWithRetry, 2000);
            });
    };
    connectWithRetry();
}
