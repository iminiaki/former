import { ISubmittedFormRepository } from "../repositories/submitterForm.repository";

export class SubmittedFormService {
    constructor(private submittedFormRepo: ISubmittedFormRepository) {}
}
