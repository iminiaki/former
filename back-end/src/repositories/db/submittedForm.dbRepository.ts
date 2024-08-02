import { DataSource, Repository } from "typeorm";
import { CreateSubmittedForm } from "../submittedForm.repository";
import { SubmittedFormEntity } from "../../entities/submittedForm.entity";
import { SubmittedForm } from "../../models/submittedForm.model";

export interface ISubmittedFormRepository {
    createSubmittedForm(
        submittedForm: CreateSubmittedForm
    ): Promise<SubmittedForm>;
    readSubmittedFormById(
        submittedFormId: number
    ): Promise<SubmittedForm | null>;
    readSubmittedFormByEmail(
        submittedFormEmail: string
    ): Promise<SubmittedForm | null>;
    updateSubmittedForm(submittedForm: SubmittedForm): Promise<boolean>;
    deleteSubmittedForm(submittedForm: SubmittedForm): Promise<boolean>;
    getAllSubmittedForm(): Promise<SubmittedForm[]>;
}

export class SubmittedFormDbRepository implements ISubmittedFormRepository {
    private submittedFormRepo: Repository<SubmittedFormEntity>;
    constructor(appDataSource: DataSource) {
        this.submittedFormRepo =
            appDataSource.getRepository(SubmittedFormEntity);
    }

    public async createSubmittedForm(
        submittedForm: CreateSubmittedForm
    ): Promise<SubmittedFormEntity> {
        const newSubmittedForm = this.submittedFormRepo.create(submittedForm);
        await this.submittedFormRepo.save(newSubmittedForm);
        return newSubmittedForm;
    }

    public async readSubmittedFormById(
        submittedFormId: number
    ): Promise<SubmittedFormEntity | null> {
        return this.submittedFormRepo.findOneBy({ id: submittedFormId });
    }

    public async readSubmittedFormByEmail(
        submittedFormEmail: string
    ): Promise<SubmittedFormEntity | null> {
        return this.submittedFormRepo.findOneBy({ email: submittedFormEmail });
    }

    public async updateSubmittedForm(
        submittedForm: SubmittedForm
    ): Promise<boolean> {
        try {
            const result = await this.submittedFormRepo.update(
                submittedForm.id,
                submittedForm
            );
            return result.affected !== 0;
        } catch (e) {
            return false;
        }
    }

    public async deleteSubmittedForm(
        submittedForm: SubmittedForm
    ): Promise<boolean> {
        try {
            const result = await this.submittedFormRepo.delete(
                submittedForm.id
            );
            return result.affected !== 0;
        } catch (e) {
            return false;
        }
    }

    public async getAllSubmittedForm(): Promise<SubmittedFormEntity[]> {
        return this.submittedFormRepo.find();
    }
}
