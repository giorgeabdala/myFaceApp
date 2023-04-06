import {Schema} from 'mongoose';
import {Professional} from "../../../domain/entities/professional";

export default class ProfessionalSchema {

     private schema: Schema = new Schema({
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

    public getSchema(): Schema {
        return this.schema;
    }

    public getProfessionalObject(professional: Professional): any {
        return {
            _id: professional.id,
            name: {
                firstName: professional.name.first,
                lastName: professional.name.last
            },
            cellPhone: {
                DDD: professional.cellPhone.DDD,
                phone: professional.cellPhone.phone
            },
            email: professional._email.address,
            calendarId: professional.calendarId
        }
    }

}
