import {User} from "./user";
import {Phone} from "./phone";
import {Email} from "./email";

export class Client implements User {
private annotations: string = '';

        constructor(readonly name: string, readonly cellPhone: Phone, readonly email?: Email, readonly id?: number) {
            if (!this.isValidName(name)) throw new Error('Invalid name');

        }

        private isValidName(name: string): boolean {
            return name.length >= 2;
        }

        setAnnotations(annotations: string) {
            if (!this.isValidAnnotations(annotations)) throw new Error('Invalid annotations');
            this.annotations = annotations;
        }

        getAnnotations(): string {
            return this.annotations;
        }

        private isValidAnnotations(annotations: string): boolean {
            return annotations.length >= 5;
        }


}