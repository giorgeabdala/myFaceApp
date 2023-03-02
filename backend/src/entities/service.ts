export class Service {

    private constructor(readonly name: string, readonly description: string) {
        if (!this.validateName(name)) throw new Error('Invalid name');
        if (!this.validateDescription(description)) throw new Error('Invalid description');
    }

    public static create(name: string, description: string): Service {
        return new Service(name, description);
    }

    private validateName(name: string): boolean {
        return name.length >= 5;
    }

    private validateDescription(description: string): boolean {
        return description.length <= 100;
    }




}