import IRepositoryFactory from "../../src/domain/factory/IRepositoryFactory";
import FactoryBuilder from "../../src/infra/factory/FactoryBuilder";
import DeleteAppointmentUseCase from "../../src/application/usecase/deleteAppointmentUseCase";

let factoryRepository: IRepositoryFactory;

beforeEach(() => {
    factoryRepository = FactoryBuilder.getFactoryRepository();
});


describe('Deve testar a exclusão de agendamentos', async () => {
    it('Deve excluir um agendamento válido', async () => {
        const deleteAppointmentUseCase = new DeleteAppointmentUseCase(factoryRepository);
        const outputOrError = await deleteAppointmentUseCase.execute('1');
        const appointmentRepository = factoryRepository.getAppointmentsRepository();
        const findAppointment = await appointmentRepository.findById('1');
        expect(findAppointment).toBeFalsy();
        expect(outputOrError.ok).toBe(true);
        const output = outputOrError.unwrap();
        expect(output).toBe(true);
    });

    it('Deve lançar um erro ao tentar excluir um agendamento inexistente', async () => {
        const deleteAppointmentUseCase = new DeleteAppointmentUseCase(factoryRepository);
        const outputOrError = await deleteAppointmentUseCase.execute('99');
        expect(outputOrError.err).toBe(true);
    });
} );