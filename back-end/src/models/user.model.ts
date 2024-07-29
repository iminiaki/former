import { Form } from "./form.model";

export interface User {
    id: number;
    name: string;
    forms: Form[];
}
