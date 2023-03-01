import {Schema, model} from "mongoose";


const appointmentSchema: Schema = new Schema({
    clientId: {
        type: String,
        ref: 'Client',
        required: true,
    },
    technician: {
        type: Schema.Types.ObjectId,
        ref: 'Technician',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
}, { _id: true });

export const AppointmentSchema = model('AppointmentSchema', appointmentSchema, 'appointment');