import {Schema} from "mongoose";
import {Appointment} from "../../../domain/entities/appointment";


export default class AppointmentSchema extends Schema {

    private appointmentSchema: Schema = new Schema({
        _id: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        startDate: {
            type: Date,
            required: true,
            index: true
        },
        endDate: {
            type: Date,
            required: true,
            index: true
        },
        price: {
            type: Number,
            required: true
        },
        professionalId: {
            type: String,
            ref: 'professional',
            required: true,
            index: true
        },
        clientId: {
            type: String,
            ref: 'client',
            required: true,
            index: true
        },
        status: {
            type: Number,
            required: true,
            index: true
        },
        paymentStatus: {
            type: Number,
            required: true,
            index: false
        }


    });

    public getSchema(): Schema {
        return this.appointmentSchema;
    }

    public getAppointmentObject(appointment: Appointment): any {
        return {
            _id: appointment.id,
            startDate: appointment.startDate,
            endDate: appointment.endDate,
            price: appointment.price,
            professionalId: appointment.getProfessionalId(),
            clientId: appointment.getClientId(),
            status: appointment.status,
            paymentStatus: appointment.paymentStatus
        }
    }

}





