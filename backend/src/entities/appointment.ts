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


    constructor(
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