export class Email {

    private constructor(readonly address: string) {}

    public static create(address: string): Email {
        if (!this.isValid(address)) throw new Error('Invalid email address');
        return new Email(address);
    }

    private static isValid(address: string): boolean {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(address);
    }

}