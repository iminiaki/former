export type elementType = 'text' | 'email' | 'number' | 'checkbox' | 'radio' | 'dropdown';

export interface FormElement {
    name: string;
    type: elementType;
    options?: string[];
    // validations: Validation[]
}
