import { FormElementWithValue } from "./formelementWithValue.model";

export interface SubmittedForm {
    id: number;
    email: string;
    data: FormElementWithValue[];
}
