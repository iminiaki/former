import { FormElementWithValue } from "../models/formelementWithValue.model";
import { SubmittedForm } from "../models/submittedForm.model";

export interface CreateSubmittedForm {
    email: string;
    data: FormElementWithValue[];
}

export interface ISubmittedFormRepository {
    createSubmittedForm(submittedForm: CreateSubmittedForm): SubmittedForm;
    readSubmittedForm(submittedFormId: number): SubmittedForm | undefined;
    updateSubmittedForm(submittedForm: SubmittedForm): boolean;
    deleteSubmittedForm(submittedForm: SubmittedForm): boolean;
    getAllSubmittedForm(): SubmittedForm[];
}

export class SubmittedFormRepository implements ISubmittedFormRepository {
    private submmitedFormRepo: SubmittedForm[];

    constructor() {
        this.submmitedFormRepo = [];
    }

    private getId(): number {
        return this.submmitedFormRepo.length + 1;
    }

    public createSubmittedForm(
        submittedForm: CreateSubmittedForm
    ): SubmittedForm {
        const newSubmittedForm: SubmittedForm = {
            ...submittedForm,
            id: this.getId(),
        };
        this.submmitedFormRepo.push(newSubmittedForm);
        return newSubmittedForm;
    }

    public readSubmittedForm(
        submittedFormId: number
    ): SubmittedForm | undefined {
        return this.submmitedFormRepo.find((x) => x.id == submittedFormId);
    }

    public updateSubmittedForm(submittedForm: SubmittedForm): boolean {
        try {
            const readSubmittedForm = this.readSubmittedForm(submittedForm.id);
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

    public deleteSubmittedForm(submittedForm: SubmittedForm): boolean {
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

    public getAllSubmittedForm(): SubmittedForm[] {
        return this.submmitedFormRepo;
    }
}
