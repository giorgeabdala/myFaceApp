import {Professional} from './professional';
import {Client} from './client';
import { Ok, Err, Result } from 'ts-results';

export enum Status {
    PENDING,
    CONFIRMED,
    CANCELED,
    REMARKED,
    FINISHED
}


export class Appointment {


    private constructor(
                readonly id: string,
                readonly startDate: Date,
                readonly endDate: Date,
                readonly price: number,
                readonly professional: Professional,
                readonly client: Client,
                public status: Status,
                ) {}

    public static create(id: string, startDate: Date, endDate: Date, price: number, professional: Professional, client: Client, status: Status): Result<Appointment, string> {
        if (!this.validateStartDate(startDate)) return new Err("Data de início do atendimento invalida");
        if (!this.validateEndDate(startDate, endDate)) return new Err("Data fim do atendimento invalida");
        if (!this.validatePrice(price)) return new Err("Valor do atendimento invalido");

        return Ok<Appointment>(new Appointment(id,startDate, endDate, price, professional, client, status))
    }

    private static validatePrice(price: number): boolean {
        return price > 0;
    }

   private static validateEndDate(startDate: Date, endDate: Date):boolean {
       return startDate < endDate && endDate > new Date('01/01/2023');
    }

    private static  validateStartDate(startDate: Date): boolean {
        return startDate > new Date("01/01/2023");
    }

    public calculateDuration(): number {
        return this.endDate.getTime() - this.startDate.getTime();
    }

    public getProfessionalId(): string {
        return this.professional.id;
    }

    public getClientId(): string {
        return this.client.id;
    }











}