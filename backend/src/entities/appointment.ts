import {Professional} from './professional';
import {Client} from './client';

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
                readonly id?: number) {
        if (!this.validateEndDate(startDate, endDate)) throw new Error('Invalid end date');
        if (!this.validatePrice(price)) throw new Error('Invalid price');
        if (!this.validateStartDate(startDate)) throw new Error('Invalid start date');

    }

    public static create(startDate: Date, endDate: Date, price: number, professional: Professional, client: Client, status: Status, id?: number): Appointment {
        return new Appointment(startDate, endDate, price, professional, client, status, id);

    }

    private validatePrice(price: number): boolean {
        return price > 0;
    }

   private validateEndDate(startDate: Date, endDate: Date): boolean {
        return startDate < endDate && endDate > new Date('01/01/2023');
    }

    private validateStartDate(startDate: Date): boolean {
        return startDate > new Date("01/01/2023");
    }

    public calculateDuration(): number {
        return this.endDate.getTime() - this.startDate.getTime();
    }











}