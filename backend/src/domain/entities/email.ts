import { Ok, Err, Result } from 'ts-results';

export class Email {

    private constructor(readonly address: string) {}

    public static create(address: string): Result<Email, string> {
        if (!this.isValid(address)) return new Err('Invalid email address');
        return  Ok(new Email(address));
    }

    private static isValid(address: string): boolean {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(address);
    }

}