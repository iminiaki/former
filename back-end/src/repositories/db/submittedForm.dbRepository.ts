import { DataSource, Repository } from "typeorm";
import { IUserRepository } from "../user.repository";
import {
    CreateSubmittedForm,
    ISubmittedFormRepository,
} from "../submittedForm.repository";
import { SubmittedFormEntity } from "../../entities/submittedForm.entity";
import { SubmittedForm } from "../../models/submittedForm.model";

export class SubmittedFormDbRepository implements ISubmittedFormRepository {
    private submittedFormRepo: Repository<SubmittedFormEntity>;
    constructor(appDataSource: DataSource) {
        this.submittedFormRepo =
            appDataSource.getRepository(SubmittedFormEntity);
    }

    public createSubmittedForm(
        submittedForm: CreateSubmittedForm
    ): SubmittedForm {
        const newSubmittedForm = this.submittedFormRepo.create(submittedForm);
        this.submittedFormRepo.save(newSubmittedForm);
        return {
            id: Number(newSubmittedForm.id),
            email: newSubmittedForm.email,
            data: newSubmittedForm.data,
        };
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
