import { FormDto, formDto } from "../dtos/createForm.dto";
import { CreateSubmittedFormDto } from "../dtos/createSubmittedForm.dto";
import { Form } from "../models/form.model";
import { IFormRepository } from "../repositories/form.repository";
import {
    ForbiddenError,
    HttpError,
    NotFoundError,
} from "../utilities/HttpError";
import { SubmittedFormService } from "./submittedForm.servicec";

export class FormService {
    constructor(
        private formRepo: IFormRepository,
        private submittedFormService: SubmittedFormService
    ) {}

    createForm(dto: FormDto) {
        try {
            formDto.parse(dto);
        } catch (error) {
            throw error;
        }

        const newForm = {
            name: dto.name,
            description: dto.description,
            elements: dto.elements,
        };

        return this.formRepo.createForm(newForm);
    }

    addSubmittedForm(dto: CreateSubmittedFormDto, formId: number): boolean {
        const newSubmittedForm =
            this.submittedFormService.createSubmittedForm(dto);
        const form = this.formRepo.readForm(formId);
        if (!newSubmittedForm || !form) {
            throw new NotFoundError();
        }

        if (form.status === "draft") {
            throw new ForbiddenError();
        }

        if (form.elements.length !== newSubmittedForm.data.length) {
            throw new HttpError(409, "Conflict");
        }

        this.formRepo.addSubmittedForm(formId, newSubmittedForm.id);
        return true;
    }

    readFormById(formId: number) {
        return this.formRepo.readForm(formId);
    }

    updateForm(form: Form): boolean {
        if (this.formRepo.updateForm(form)) {
            return true;
        }
        return false;
    }
}
