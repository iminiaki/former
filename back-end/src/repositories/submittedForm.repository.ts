import { FormElementWithValue } from "../models/formElementWithValue.model";
import { SubmittedForm } from "../models/submittedForm.model";

export interface CreateSubmittedForm {
    email: string;
    data: FormElementWithValue[];
}

export interface ISubmittedFormRepository {
    createSubmittedForm(submittedForm: CreateSubmittedForm): Promise<SubmittedForm>;
    readSubmittedFormById(submittedFormId: number): Promise<SubmittedForm | undefined | null>;
    readSubmittedFormByEmail(submittedFormEmail: string): Promise<SubmittedForm | undefined | null>; 
    updateSubmittedForm(submittedForm: SubmittedForm): Promise<boolean>;
    deleteSubmittedForm(submittedForm: SubmittedForm): Promise<boolean>;
    getAllSubmittedForm(): Promise<SubmittedForm[]>;
}

export class SubmittedFormRepository implements ISubmittedFormRepository {
    private submmitedFormRepo: SubmittedForm[];

    constructor() {
        this.submmitedFormRepo = [];
    }

    private getId(): number {
        return this.submmitedFormRepo.length + 1;
    }

    public async createSubmittedForm(
        submittedForm: CreateSubmittedForm
    ): Promise<SubmittedForm> {
        const newSubmittedForm: SubmittedForm = {
            ...submittedForm,
            id: this.getId(),
        };
        this.submmitedFormRepo.push(newSubmittedForm);
        return newSubmittedForm;
    }

    public async readSubmittedFormById(
        submittedFormId: number
    ): Promise<SubmittedForm | undefined> {
        return this.submmitedFormRepo.find((x) => x.id == submittedFormId);
    }

    public async readSubmittedFormByEmail(
        submittedFormEmail: string
    ): Promise<SubmittedForm | undefined> {
        return this.submmitedFormRepo.find((x) => x.email === submittedFormEmail);
    }

    public async updateSubmittedForm(submittedForm: SubmittedForm): Promise<boolean> {
        try {
            const readSubmittedForm = await this.readSubmittedFormById(submittedForm.id);
            if (readSubmittedForm) {
                readSubmittedForm.email = submittedForm.email;
                readSubmittedForm.data = submittedForm.data;
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    public async deleteSubmittedForm(submittedForm: SubmittedForm): Promise<boolean> {
        try {
            const index = this.submmitedFormRepo.indexOf(submittedForm);
            if (index >= 0) {
                this.submmitedFormRepo.splice(index, 1);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    public async getAllSubmittedForm(): Promise<SubmittedForm[]> {
        return this.submmitedFormRepo;
    }
}
