import { DataSource, Repository } from "typeorm";
import { FormEntity } from "../../entities/form.entity";
import { SubmittedFormEntity } from "../../entities/submittedForm.entity";
import { Form } from "../../models/form.model";
import { FormElement } from "../../models/formElement.model";
import { SubmittedForm } from "../../models/submittedForm.model";
import { CreateSubmittedForm } from "../submittedForm.repository";

export interface CreateForm {
    name: string;
    description: string;
    elements: FormElement[];
}

export interface IFormRepository {
    createForm(form: CreateForm): Promise<Form>;
    readForm(formId: number): Promise<Form | null>;
    addSubmittedForm(
        formId: number,
        submittedForm: SubmittedForm
    ): Promise<boolean>;
    updateForm(form: Form): Promise<boolean>;
    deleteForm(form: Form): Promise<boolean>;
    getAllForms(): Promise<Form[]>;
}

export class FormDbRepository implements IFormRepository {
    private formRepo: Repository<FormEntity>;
    constructor(appDataSource: DataSource) {
        this.formRepo = appDataSource.getRepository(FormEntity);
    }

    public async createForm(form: CreateForm): Promise<Form> {
        const newFormEntity = await this.formRepo.save({
            ...form,
            status: "draft",
            submittedForms: [],
        });
        return newFormEntity;
    }

    public async readForm(formId: number): Promise<Form | null> {
        const formEntity = await this.formRepo.findOne({
            where: { id: formId },
            relations: ["submittedForms"],
        });
        return formEntity;
    }

    public async updateForm(form: Form): Promise<boolean> {
        if (!(await this.readForm(form.id))) {
            return false;
        }
        await this.formRepo.save(form);
        return true;
    }

    public async addSubmittedForm(
        formId: number,
        submittedForm: SubmittedForm
    ): Promise<boolean> {
        const formEntity = await this.formRepo.findOneBy({ id: formId });

        if (formEntity) {
            await this.formRepo.save({
                ...formEntity,
                submittedForms: [...formEntity.submittedForms, submittedForm],
            });
            return true;
        }
        return false;
    }

    public async deleteForm(form: Form): Promise<boolean> {
        try {
            const result = await this.formRepo.delete(form.id);
            return result.affected !== 0;
        } catch {
            return false;
        }
    }

    public async getAllForms(): Promise<Form[]> {
        return this.formRepo.find();
    }
}
