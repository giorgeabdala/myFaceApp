import {Status} from "../../domain/entities/appointment";

export class CreateAppointmentInput {

    constructor(
        readonly startDate: Date,
        readonly endDate: Date,
        readonly price: number,
        readonly professionalId: string,
        readonly clientId: string,
        readonly status: Status) {}
}

export class CreateAppointmentOutput {
    constructor(
        readonly id: string,
        readonly startDate: Date,
        readonly endDate: Date,
        readonly price: number,
        readonly professionalId: string,
        readonly clientId: string,
        readonly status: Status)
         {}
}


