import { Ok, Err, Result } from 'ts-results';

export class Phone {

    private constructor(readonly DDD: string, readonly phone: string) {}

    public static create(DDD: string, _phone: string): Result<Phone, string> {
        if (!this.isValid(DDD, _phone)) return new Err('Invalid phone number');
        const phone = new Phone(DDD, _phone);
        return Ok<Phone>(phone);
    }

    private static isValid(DDD: string, number: string): boolean {
        return this.isValidDDD(DDD) && this.isValidPhone(number);
    }

    private static isValidDDD(DDD: string): boolean {
        return DDD.length === 2;
    }

    private static isValidPhone(_phone: string): boolean {
        return _phone.length === 9;
    }



}