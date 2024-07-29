import { IFormRepository } from "../repositories/form.repository";
import { SubmittedFormService } from "./submittedForm.servicec";

export class FormService {
    constructor(
        private formRepo: IFormRepository,
        private submittedFormService: SubmittedFormService
    ) {}
}
