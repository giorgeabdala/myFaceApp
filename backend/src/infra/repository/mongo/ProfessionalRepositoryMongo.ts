import {IProfessionalRepository} from "../../../domain/adapters/IProfessionalRepository";
import {Professional} from "../../../domain/entities/professional";
import IConnection from "../../../domain/adapters/IConnection";
import ProfessionalSchema from "../../db/mongo/professionalSchema";
import {Model, Document} from "mongoose";


export default class ProfessionalRepositoryMongo implements IProfessionalRepository {
    private readonly connection: IConnection;

    constructor(connection: IConnection) {
        this.connection = connection;
    }

    private async getProfessionalModel(): Promise<any> {
        const db = await this.connection.connect();
        const professionalSchema = new ProfessionalSchema();
        return db.model('ProfessionalSchema', professionalSchema.getSchema(), 'professional');
    }

    private async getProfessionalDocument(professional: Professional): Promise<any> {
        const professionalModel = await this.getProfessionalModel();
        return new professionalModel(new ProfessionalSchema().getProfessionalObject(professional));
    }

    async delete(professional: Professional): Promise<void> {
        const professionalModel = await this.getProfessionalModel();
        await professionalModel.deleteOne({"_id": professional.id});
    }

    async findByEmail(email: string): Promise<Professional> | undefined {
        const professionalModel = await this.getProfessionalModel();
        const professionalDocument = await professionalModel.findOne({email: email});
        if (!professionalDocument) return null;
        return Professional.create(professionalDocument.id,
            professionalDocument.name.firstName,
            professionalDocument.name.lastName,
            professionalDocument.cellPhone.DDD,
            professionalDocument.cellPhone.phone,
            professionalDocument.email,
            professionalDocument.calendarId).unwrap();
    }

    async findById(id: string): Promise<Professional> | undefined {
        const professionalModel = await this.getProfessionalModel();
        const professionalDocument = await professionalModel.findById(id);
        if (!professionalDocument) return null;
        return Professional.create(professionalDocument.id,
            professionalDocument.name.firstName,
            professionalDocument.name.lastName,
            professionalDocument.cellPhone.DDD,
            professionalDocument.cellPhone.phone,
            professionalDocument.email,
            professionalDocument.calendarId).unwrap();
    }

    async save(professional: Professional): Promise<void> {
        const professionalDocument = await this.getProfessionalDocument(professional);
        await professionalDocument.save();
    }

    async findAll(): Promise<Professional[]> {
        const professionalModel = await this.getProfessionalModel();
        const professionalDocuments = await professionalModel.find();
        if (!professionalDocuments) return null;
        return professionalDocuments.map(professionalDocument => {
            return Professional.create(professionalDocument.id,
                professionalDocument.name.firstName,
                professionalDocument.name.lastName,
                professionalDocument.cellPhone.DDD,
                professionalDocument.cellPhone.phone,
                professionalDocument.email,
                professionalDocument.calendarId).unwrap();
        } );

    }

    async update(professional: Professional): Promise<Professional> {
        const professionalModel = await this.getProfessionalModel();
        const professionalDocument = await professionalModel.findById(professional.id);
        if (!professionalDocument) return null;

        professionalDocument.overwrite(new ProfessionalSchema().getProfessionalObject(professional));
        await professionalDocument.save();
        return Professional.create(professionalDocument.id,
            professionalDocument.name.firstName,
            professionalDocument.name.lastName,
            professionalDocument.cellPhone.DDD,
            professionalDocument.cellPhone.phone,
            professionalDocument.email,
            professionalDocument.calendarId).unwrap();
    }



}