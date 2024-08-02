import { FormDto, formDto } from "../dtos/createForm.dto";
import { CreateSubmittedFormDto } from "../dtos/createSubmittedForm.dto";
import { Form } from "../models/form.model";
import { SubmittedForm } from "../models/submittedForm.model";
import {
    ForbiddenError,
    HttpError,
    NotFoundError,
} from "../utilities/HttpError";
import { SubmittedFormService } from "./submittedForm.service";
import { FormElementWithValue } from "../models/formElementWithValue.model";
import { IFormRepository } from "../repositories/db/form.dbRepository";

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

    async addSubmittedForm(dto: CreateSubmittedFormDto, formId: number) {
        const form = await this.readFormById(formId);
        const newSubmittedForm =
            await this.submittedFormService.createSubmittedForm(dto);
        if (!newSubmittedForm) {
            throw new NotFoundError();
        }

        if (form.status === "draft") {
            throw new ForbiddenError();
        }

        if (form.elements.length !== newSubmittedForm.data.length) {
            throw new HttpError(409, "Conflict");
        }

        this.formRepo.addSubmittedForm(formId, newSubmittedForm);
        return true;
    }

    async switchFormStatus(formId: number) {
        const form = await this.readFormById(formId);
        if (form.status === "draft") {
            form.status = "published";
            return "published";
        } else {
            form.status = "draft";
            return "draft";
        }
    }

    async getFormResponses(formId: number) {
        const form = await this.readFormById(formId);
        const responses: SubmittedForm[] = [];
        if (form.submittedForms.length == 0) {
            return responses;
        }

        form.submittedForms.forEach(async (submittedForm) => {
            const submitted =
                await this.submittedFormService.readSubmittedFormById(
                    submittedForm.id
                );
            if (submitted) {
                responses.push(submitted);
            }
        });

        const responsesDict = responses.reduce((acc, cur) => {
            acc[cur.email] = cur.data;
            return acc;
        }, {} as Record<string, FormElementWithValue[]>);

        return responsesDict;
    }

    // getFormResponsesSummary(formId: number) {
    //     const responses: SubmittedForm[] = this.getFormResponses(formId);
    //     const elements: FormElement[] = this.getFormElements(formId);
    //     // const summary: FormQuestionResponses[] = [];
    //     const summarySelwctQuestions: FormSelectQuestionResponses[] = [];
    //     const summaryTextQuestions: FormTextQuestionResponses[] = [];

    //     if (responses.length == 0) {
    //         return {
    //             summaryTextQuestions: summaryTextQuestions,
    //             summarySelwctQuestions: summarySelwctQuestions,
    //         };
    //     }

    //     elements.forEach((element) => {
    //         if (element.options) {
    //             const questionOptions: OptionsResponses[] = [];
    //             element.options.forEach((option) => {
    //                 questionOptions.push({ option: option, count: 0 });
    //             });
    //             const question: FormSelectQuestionResponses = {
    //                 name: element.name,
    //                 responses: questionOptions,
    //             };
    //             summarySelwctQuestions.push(question);
    //         } else {
    //             const question: FormTextQuestionResponses = {
    //                 name: element.name,
    //                 responses: [],
    //             };
    //             summaryTextQuestions.push(question);
    //         }
    //     });

    //     // summary.forEach((question) => {
    //     //     responses.forEach((response) => {
    //     //         question.
    //     //     })
    //     // })

    //     responses.forEach((response) => {
    //         response.data.forEach((responseData) => {
    //             if (responseData.type == "option") {
    //                 const summaryElement = summarySelwctQuestions.find(
    //                     (x) => x.name == responseData.name
    //                 );
    //                 if (summaryElement) {
    //                     const summaryOption = summaryElement.responses.find(
    //                         (x) => x.option == responseData.value
    //                     );
    //                     if (summaryOption) {
    //                         summaryOption.count++;
    //                     }
    //                 }
    //             } else {
    //                 const summaryElement = summaryTextQuestions.find(
    //                     (x) => x.name == responseData.name
    //                 );
    //                 if (summaryElement) {
    //                     summaryElement.responses.push(responseData.value);
    //                 }
    //             }
    //         });
    //     });

    //     return {
    //         summaryTextQuestions: summaryTextQuestions,
    //         summarySelwctQuestions: summarySelwctQuestions,
    //     };
    // }

    async getFormElements(formId: number) {
        const form = await this.readFormById(formId);
        return form.elements;
    }

    async getFormById(formId: number) {
        const form = await this.readFormById(formId);
        if (form.status === "draft") {
            throw new ForbiddenError();
        }

        return {
            id: form.id,
            name: form.name,
            description: form.description,
            elements: form.elements,
        };
    }

    async readFormById(formId: number) {
        const form = await this.formRepo.readForm(formId);
        if (!form) {
            throw new NotFoundError();
        }
        return form;
    }

    async updateForm(form: Form) {
        const updateStatus = await this.formRepo.updateForm(form);
        if (updateStatus) {
            return true;
        }
        return false;
    }
}
