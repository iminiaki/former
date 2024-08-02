import { FormEntity } from "../entities/form.entity";
import { Form } from "../models/form.model";
import { FormElement } from "../models/formElement.model";
import { IFormRepository } from "./db/form.dbRepository";

export interface CreateForm {
    name: string;
    description: string;
    elements: FormElement[];
}

// export class FormRepository implements IFormRepository {
//     private formRepo: Form[];

//     constructor() {
//         this.formRepo = [];
//     }

//     private genId(): number {
//         return this.formRepo.length + 1;
//     }

//     public async createForm(form: CreateForm): Promise<Form> {
//         const submittedForms: number[] = [];
//         const status = "draft";
//         const newForm: Form = {
//             ...form,
//             id: this.genId(),
//             submittedForms: submittedForms,
//             status: status,
//         };
//         this.formRepo.push(newForm);
//         return newForm;
//     }

//     public async readForm(formId: number): Promise<Form | undefined> {
//         return this.formRepo.find((x) => x.id == formId);
//     }

//     public async updateForm(form: Form): Promise<boolean> {
//         try {
//             const readForm = await this.readForm(form.id);
//             if (readForm) {
//                 readForm.name = form.name;
//                 readForm.description = form.description;
//                 readForm.elements = form.elements;
//                 return true;
//             }
//             return false;
//         } catch (e) {
//             return false;
//         }
//     }

//     public async addSubmittedForm(
//         formId: number,
//         submittedFormId: number
//     ): Promise<boolean> {
//         try {
//             const readForm = await this.readForm(formId);
//             if (readForm) {
//                 readForm.submittedForms.push(submittedFormId);
//                 return true;
//             }
//             return false;
//         } catch (e) {
//             return false;
//         }
//     }

//     public async deleteForm(form: Form): Promise<boolean> {
//         try {
//             const index = this.formRepo.indexOf(form);
//             if (index >= 0) {
//                 this.formRepo.splice(index, 1);
//                 return true;
//             }
//             return false;
//         } catch (e) {
//             return false;
//         }
//     }
//     public async getAllForms(): Promise<Form[]> {
//         return this.formRepo;
//     }
// }
