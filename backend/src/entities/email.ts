export class Email {

    constructor(readonly address: string) {
        if (!this.isValid(address)) throw new Error('Invalid email address');
        this.address = address;
    }

    private isValid(address: string): boolean {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(address);
    }

}