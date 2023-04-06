import {IAppointmentRepository} from "../../../domain/adapters/IAppointmentRepository";
import IConnection from "../../../domain/adapters/IConnection";
import {Appointment} from "../../../domain/entities/appointment";
import AppointmentSchema from "../../db/mongo/appointmentSchema";
import IClientRepository from "../../../domain/adapters/IClientRepository";
import {IProfessionalRepository} from "../../../domain/adapters/IProfessionalRepository";
import IRepositoryFactory from "../../../domain/factory/IRepositoryFactory";


export default class AppointmentRepositoryMongo implements IAppointmentRepository {
    private readonly connection: IConnection;
    private readonly clientRepository: IClientRepository;
    private readonly professionalRepository: IProfessionalRepository;

    constructor(connection: IConnection, factoryRepository: IRepositoryFactory) {
        this.connection = connection;
        this.clientRepository = factoryRepository.getClientRepository();
        this.professionalRepository = factoryRepository.getProfessionalRepository();
    }

    private async getAppointmentModel(): Promise<any> {
        const db = await this.connection.connect();
        const appointmentSchema = new AppointmentSchema();
        return db.model('AppointmentSchema', appointmentSchema.getSchema(), 'appointment');
    }

    private async getAppointmentDocument(appointment: Appointment): Promise<any> {
        const appointmentModel = await this.getAppointmentModel();
        return new appointmentModel(new AppointmentSchema().getAppointmentObject(appointment));
    }

    async delete(appointment: Appointment): Promise<void> {
        const appointmentModel = await this.getAppointmentModel();
        await appointmentModel.deleteOne({"_id": appointment.id});
    }

    async findByClientId(idClient: string): Promise<Appointment[]> {
        const appointmentModel = await this.getAppointmentModel();
        const appointmentDocument = await appointmentModel.find({clientId: idClient});
        if (!appointmentDocument) return null;

        return Promise.all(appointmentDocument.map(async (appointment) => {
            return Appointment.create(appointment.id,
                appointment.startDate,
                appointment.endDate,
                appointment.price,
                await this.professionalRepository.findById(appointment.professionalId),
            await this.clientRepository.findById(appointment.clientId),
                appointment.status,
                appointment.paymentStatus).unwrap();
        } ));
    }

    async findById(id: string): Promise<Appointment> {
        const appointmentModel = await this.getAppointmentModel();
        const appointmentDocument = await appointmentModel.findById(id);
        if (!appointmentDocument) return null;

        const client = await this.clientRepository.findById(appointmentDocument.clientId);
        const professional = await this.professionalRepository.findById(appointmentDocument.professionalId);
        return Appointment.create(appointmentDocument.id,
            appointmentDocument.startDate,
            appointmentDocument.endDate,
            appointmentDocument.price,
            professional,
            client,
            appointmentDocument.status,
            appointmentDocument.paymentStatus).unwrap();
    }

    async findByProfessionalId(idProfessional: string): Promise<Appointment[]> {
        const appointmentModel = await this.getAppointmentModel();
        const appointmentDocument = await appointmentModel.find({professionalId: idProfessional});
        if (!appointmentDocument) return null;

        return Promise.all(
            appointmentDocument.map(async (appointment) => {
                const professional = await this.professionalRepository.findById(appointment.professionalId);
                const client = await this.clientRepository.findById(appointment.clientId);
                return Appointment.create(appointment.id,
                    appointment.startDate,
                    appointment.endDate,
                    appointment.price,
                    professional,
                    client,
                    appointment.status,
                    appointment.paymentStatus).unwrap();
            })

        );

    }

    async save(appointment: Appointment): Promise<void> {
       const appointmentDocument = await this.getAppointmentDocument(appointment);
       await appointmentDocument.save();
    }

    async update(appointment: Appointment): Promise<void> {
        const appointmentModel = await this.getAppointmentModel();
        await appointmentModel.updateOne({_id: appointment.id}, new AppointmentSchema().getAppointmentObject(appointment));

    }



}