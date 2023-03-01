
export class Phone {

    constructor(readonly DDD: string, readonly number: string) {
        if (!this.isValid(DDD, number)) throw new Error('Invalid phone number');

        this.DDD = DDD;
        this.number = number;

    }

    private isValid(DDD: string, number: string): boolean {
        return this.isValidDDD(DDD) && this.isValidNumber(number);
    }

    private isValidDDD(DDD: string): boolean {
        return DDD.length === 2;
    }

    private isValidNumber(number: string): boolean {
        return number.length === 9;
    }



}