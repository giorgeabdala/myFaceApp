export  class CreateProfessionalInput {
    constructor(
        readonly firstName,
        readonly lastName: string,
        readonly DDD: string,
        readonly phone: string,
        readonly email: string,
        readonly calendarId?: string
    ) {}

}

export class CreateProfessionalOutput {
    constructor( readonly id: string,
                 readonly firstName,
                 readonly lastName: string,
                 readonly DDD: string,
                 readonly phone: string,
                 readonly email: string,
                 readonly calendarId?: string)
    {}
}