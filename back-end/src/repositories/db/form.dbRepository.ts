import { DataSource, Repository } from "typeorm";
import { FormEntity } from "../../entities/form.entity";
import { CreateForm } from "../form.repository";
import { SubmittedFormEntity } from "../../entities/submittedForm.entity";
import { Form } from "../../models/form.model";

export interface IFormRepository {
    createForm(form: CreateForm): Promise<Form>;
    readForm(formId: number): Promise<Form | null>;
    addSubmittedForm(formId: number, submittedFormId: number): Promise<boolean>;
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
        const newFormEntity = this.formRepo.create({
            ...form,
            status: "draft",
            submittedForms: [],
        });
        const savedEntity = await this.formRepo.save(newFormEntity);
        return {
            ...savedEntity,
            submittedForms: [],
        };
    }

    public async readForm(formId: number): Promise<Form | null> {
        const formEntity = await this.formRepo.findOne({
            where: { id: formId },
            relations: ["submittedForms"],
        });
        return formEntity;
    }

    public async updateForm(form: Form): Promise<boolean> {
        try {
            const result = await this.formRepo.update(form.id, {
                name: form.name,
                description: form.description,
                elements: form.elements,
                status: form.status,
            });
            return result.affected !== 0;
        } catch {
            return false;
        }
    }

    public async addSubmittedForm(
        formId: number,
        submittedFormId: number
    ): Promise<boolean> {
        try {
            const formEntity = await this.formRepo.findOneBy({ id: formId });
            if (formEntity) {
                const submittedFormEntity = {
                    id: submittedFormId,
                } as SubmittedFormEntity;
                formEntity.submittedForms.push(submittedFormEntity);
                await this.formRepo.save(formEntity);
                return true;
            }
            return false;
        } catch {
            return false;
        }
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
