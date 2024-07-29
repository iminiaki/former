import { FormElement } from "./formElement.model";
import { SubmittedForm } from "./submittedForm.model";

export interface Form {
    id: number;
    name: string;
    description: string;
    elements: FormElement[];
    status: 'published' | 'draft'
    submittedForms: SubmittedForm[];
}
