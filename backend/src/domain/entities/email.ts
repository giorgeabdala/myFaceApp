import {Result} from "../../utils/result";

export class Email {

    private constructor(readonly address: string) {}

    public static create(address: string): Result<Email> {
        if (!this.isValid(address)) return Result.fail('Invalid email address');
        return  Result.ok(new Email(address));
    }

    private static isValid(address: string): boolean {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(address);
    }

}