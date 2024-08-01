import { FormElement } from "./formElement.model";

export interface Form {
    id: number;
    name: string;
    description: string;
    elements: FormElement[];
    status: "published" | "draft";
    submittedForms: number[];
}
