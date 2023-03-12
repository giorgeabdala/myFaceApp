import {PaymentStatus, Status} from "../../domain/entities/appointment";

export class UpdateAppointmentInput {

    constructor(
        readonly id: string,
        readonly startDate: Date,
        readonly endDate: Date,
        readonly price: number,
        readonly professionalId: string,
        readonly clientId: string,
        readonly status: Status,
        readonly paymentStatus: PaymentStatus
    ) {}
}

export class UpdateAppointmentOutput {
    constructor(
        readonly id: string,
        readonly startDate: Date,
        readonly endDate: Date,
        readonly price: number,
        readonly professionalId: string,
        readonly clientId: string,
        readonly status: Status,
        readonly paymentStatus: PaymentStatus)
    {}
}


