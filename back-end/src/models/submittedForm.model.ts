import { FormElementWithValue } from "./formElementWithValue.model";

export interface SubmittedForm {
    id: number;
    email: string;
    data: FormElementWithValue[];
}
