import mongoose, {Schema} from 'mongoose';
import {Client} from "../../../domain/entities/client";

export interface IClientSchema extends mongoose.Document {
    _id: string;
    name: {
        firstName: string;
        lastName: string;
        }
    cellPhone: {
        DDD: string;
        phone: string;

    }
    email: string;
}

export default class ClientSchema {



    private clientSchema: Schema = new mongoose.Schema({
        _id: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        name: {
            firstName: {
                type: String,
                required: true
            },
            //TODO: alterar opção de lastname após implementação do front
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
        }
    });


    public getSchema(): Schema {
        return this.clientSchema;
    }

    public getClientObject(client: Client): any {
        return {
            _id: client.id,
            name: {
                firstName: client.firstName,
                lastName: client.lastName
            },
            cellPhone: {
                DDD: client.cellPhone.DDD,
                phone: client.cellPhone.phone
            },
            email: client.email
        }
    }

}










