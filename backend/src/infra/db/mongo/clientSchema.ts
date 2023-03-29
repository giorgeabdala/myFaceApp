import {Schema, model} from 'mongoose';


const clientSchema: Schema = new Schema({
    clientId: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    DDD: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }

});

export const ClientSchema = model('ClientSchema', clientSchema, 'client');
