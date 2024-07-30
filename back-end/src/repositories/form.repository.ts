import { Form } from "../models/form.model";
import { FormElement } from "../models/formElement.model";
import { SubmittedForm } from "../models/submittedForm.model";

export interface CreateForm {
    name: string;
    description: string;
    elements: FormElement[];
}

export interface IFormRepository {
    createForm(form: CreateForm): Form;
    readForm(formId: number): Form | undefined;
    addSubmittedForm(formId: number, submittedFormId: number): boolean;
    updateForm(form: Form): boolean;
    deleteForm(form: Form): boolean;
    getAllForms(): Form[];
}

export class FormRepository implements IFormRepository {
    private formRepo: Form[];

    constructor() {
        this.formRepo = [];
    }

    private genId(): number {
        return this.formRepo.length + 1;
    }

    public createForm(form: CreateForm): Form {
        const submittedForms: number[] = [];
        const status = "draft";
        const newForm: Form = {
            ...form,
            id: this.genId(),
            submittedForms: submittedForms,
            status: status,
        };
        this.formRepo.push(newForm);
        return newForm;
    }

    public readForm(formId: number): Form | undefined {
        return this.formRepo.find((x) => x.id == formId);
    }

    public updateForm(form: Form): boolean {
        try {
            const readForm = this.readForm(form.id);
            if (readForm) {
                readForm.name = form.name;
                readForm.description = form.description;
                readForm.elements = form.elements;
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    public addSubmittedForm(formId: number, submittedFormId: number): boolean {
        try {
            const readForm = this.readForm(formId);
            if (readForm) {
                readForm.submittedForms.push(submittedFormId);
                return true;
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }

    public deleteForm(form: Form): boolean {
        try {
            const index = this.formRepo.indexOf(form);
            if (index >= 0) {
                this.formRepo.splice(index, 1);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }
    public getAllForms(): Form[] {
        return this.formRepo;
    }
}
