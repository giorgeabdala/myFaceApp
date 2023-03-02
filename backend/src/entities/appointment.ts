import {Professional} from './professional';
import {Client} from './client';
import {Result} from "../utils/result";

export enum Status {
    PENDING,
    CONFIRMED,
    CANCELED,
    REMARKED,
    FINISHED
}


export class Appointment {


    private constructor(
                readonly startDate: Date,
                readonly endDate: Date,
                readonly price: number,
                readonly professional: Professional,
                readonly client: Client,
                public status: Status,
                readonly id?: number) {}

    public static create(startDate: Date, endDate: Date, price: number, professional: Professional, client: Client, status: Status, id?: number): Result<Appointment> {
        if (!this.validateStartDate(startDate)) return Result.fail("Data de início do atendimento invalida");
        if (!this.validateEndDate(startDate, endDate)) return Result.fail("Data fim do atendimento invalida");
        if (!this.validatePrice(price)) return Result.fail("Valor do atendimento invalido");

        return Result.ok<Appointment>(new Appointment(startDate, endDate, price, professional, client, status, id))
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











}