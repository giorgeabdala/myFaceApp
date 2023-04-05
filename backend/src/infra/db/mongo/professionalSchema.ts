import {Schema} from 'mongoose';

export const ProfessionalSchema: Schema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true
    }, name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: false
        }
    },
    cellPhone: {
        DDD: {
            type: String,
            required: true,
            index: true
        },
        phone: {
            type: String,
            required: true,
            index: true
        }
    },
    email: {
        type: String,
        required: false,
        index: true
    },
    calendarId: {
        type: String,
        required: false

    }


} );

