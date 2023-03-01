export class Service {

    constructor(readonly name: string, readonly description: string) {
        if (!this.validateName(name)) throw new Error('Invalid name');
        if (!this.validateDescription(description)) throw new Error('Invalid description');
    }

    private validateName(name: string): boolean {
        return name.length >= 5;
    }

    private validateDescription(description: string): boolean {
        return description.length <= 100;
    }




}