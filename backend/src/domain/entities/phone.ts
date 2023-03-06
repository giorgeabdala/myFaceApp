import { Ok, Err, Result } from 'ts-results';

export class Phone {

    private constructor(readonly DDD: string, readonly number: string) {}

    public static create(DDD: string, number: string): Result<Phone, string> {
        if (!this.isValid(DDD, number)) return new Err('Invalid phone number');
        const phone = new Phone(DDD, number);
        return Ok<Phone>(phone);
    }

    private static isValid(DDD: string, number: string): boolean {
        return this.isValidDDD(DDD) && this.isValidNumber(number);
    }

    private static isValidDDD(DDD: string): boolean {
        return DDD.length === 2;
    }

    private static isValidNumber(number: string): boolean {
        return number.length === 9;
    }



}