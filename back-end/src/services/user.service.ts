import { getUserFormsDto, GetUserFormsDto } from "../dtos/getUserForms.dto";
import { Form } from "../models/form.model";
import { IUserRepository } from "../repositories/user.repository";
import { NotFoundError } from "../utilities/HttpError";
import { FormService } from "./form.service";

export interface UserForm {
    id: number;
    name: string;
    description: string;
    status: "published" | "draft";
}

export class UserService {
    constructor(
        private userRepo: IUserRepository,
        private formService: FormService
    ) {}

    getUserForms(dto: GetUserFormsDto) {
        try {
            getUserFormsDto.parse(dto);
        } catch (error) {
            throw error;
        }

        const userForms: UserForm[] = [];

        const user = this.userRepo.readUserWithNamePassword(
            dto.name,
            dto.password
        );
        if (!user) {
            throw new NotFoundError();
        }

        if (user.forms.length == 0) {
            return userForms;
        }

        const fullUserForms: Form[] = [];
        user.forms.forEach((formId) => {
            const form = this.formService.readFormById(formId);
            if (form) {
                fullUserForms.push(form);
            }
        });

        fullUserForms.map((form) => {
            const userForm: UserForm = {
                id: form.id,
                name: form.name,
                description: form.description,
                status: form.status,
            };
            userForms.push(userForm);
        });

        return userForms;
    }
}
