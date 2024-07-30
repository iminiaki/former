import { FormElement } from "./formElement.model";

export interface FormElementWithValue extends FormElement {
    value: string;
}
