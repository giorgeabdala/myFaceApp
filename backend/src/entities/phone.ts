
export class Phone {

    private constructor(readonly DDD: string, readonly number: string) {}

    public static create(DDD: string, number: string): Phone {
        if (!this.isValid(DDD, number)) throw new Error('Invalid phone number');
        return new Phone(DDD, number);
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