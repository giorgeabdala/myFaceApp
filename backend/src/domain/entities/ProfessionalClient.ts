import {Professional} from "./professional";
import {Client} from "./client";


export default class ProfessionalClient {
    constructor(readonly professional: Professional, readonly client: Client, readonly annotations?: string) {}
}