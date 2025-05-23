export class UpdateClientInput {
    constructor(
        readonly id: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly DDD: string,
        readonly phone: string,
        readonly email: string
    ) {}
}

export class UpdateClientOutput {
    constructor(
        readonly id: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly DDD: string,
        readonly phone: string,
        readonly email: string
    ) {}
}