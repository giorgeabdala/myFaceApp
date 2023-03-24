import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import {Err, Ok, Result} from "ts-results";


export default class DeleteAppointmentUseCase {
    constructor(readonly factoryRepository: IRepositoryFactory) {}

    async execute(id: string): Promise<Result<boolean, string>> {
        const repository = this.factoryRepository.getAppointmentsRepository();
        const appointment = await repository.findById(id);
        if (!appointment) return Err('Impossível deletar Agendamento. Agendamento não encontrado');
        await repository.delete(appointment);
        return Ok(true);
    }
}