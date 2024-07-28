import { FormElement } from "./formElement.model";
import { SubmittedForm } from "./submittedform.model";

export interface Form {
    id: number;
    name: string;
    description: string;
    elements: FormElement[];
    submittedForms: SubmittedForm[];
}
