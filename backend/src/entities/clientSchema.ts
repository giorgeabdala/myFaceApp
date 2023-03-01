import {Schema, model} from 'mongoose';


const clientSchema: Schema = new Schema({
    clientId: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    name: {
        type: String,
        required: true
    }
});

export const ClientSchema = model('ClientSchema', clientSchema, 'client');
