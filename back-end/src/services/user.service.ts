import { read } from "fs";
import { FormDto, formDto } from "../dtos/createForm.dto";
import { userDto, UserDto } from "../dtos/getUserForms.dto";
import { Form } from "../models/form.model";
import { FormElement } from "../models/formElement.model";
import { IUserRepository } from "../repositories/user.repository";
import { ForbiddenError, NotFoundError } from "../utilities/HttpError";
import { FormService } from "./form.service";

export interface UserForm {
    id: number;
    name: string;
    description: string;
    status: "published" | "draft";
}

export interface UserFormWithElements extends UserForm {
    elements: FormElement[];
}

export class UserService {
    constructor(
        private userRepo: IUserRepository,
        private formService: FormService
    ) {}

    async getUserForms(dto: UserDto) {
        try {
            userDto.parse(dto);
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

    addForm(user_dto: UserDto, dto: FormDto) {
        try {
            userDto.parse(user_dto);
        } catch (error) {
            throw error;
        }

        const user = this.userRepo.readUserWithNamePassword(
            user_dto.name,
            user_dto.password
        );
        if (!user) {
            throw new NotFoundError();
        }

        try {
            const createdForm: Form = this.formService.createForm(dto);
            if (!this.userRepo.addForm(user.id, createdForm.id)) {
                throw new NotFoundError();
            }

            return createdForm;
        } catch (error) {
            throw error;
        }
    }

    getFormWithId(user_dto: UserDto, formId: number): UserFormWithElements {
        try {
            userDto.parse(user_dto);
        } catch (error) {
            throw error;
        }

        const user = this.userRepo.readUserWithNamePassword(
            user_dto.name,
            user_dto.password
        );
        if (!user) {
            throw new NotFoundError();
        }

        if (!user.forms.includes(formId)) {
            throw new ForbiddenError();
        }

        const readedForm = this.formService.readFormById(formId);
        if (!readedForm) {
            throw new NotFoundError();
        }

        return {
            id: readedForm.id,
            name: readedForm.name,
            description: readedForm.description,
            elements: readedForm.elements,
            status: readedForm.status,
        };
    }

    updateForm(user_dto: UserDto, formId: number, formDto: FormDto) {
        try {
            userDto.parse(user_dto);
        } catch (error) {
            throw error;
        }

        const user = this.userRepo.readUserWithNamePassword(
            user_dto.name,
            user_dto.password
        );
        if (!user) {
            throw new NotFoundError();
        }

        if (!user.forms.includes(formId)) {
            throw new ForbiddenError();
        }

        const readedForm = this.formService.readFormById(formId);
        if (!readedForm) {
            throw new NotFoundError();
        }

        if (readedForm.submittedForms.length != 0) {
            throw new ForbiddenError();
        }

        try {
            const updateResult = this.formService.updateForm({
                id: formId,
                ...formDto,
                status: readedForm.status,
                submittedForms: readedForm.submittedForms,
            });
            if (updateResult) {
                return {
                    id: formId,
                    ...formDto,
                    status: readedForm.status,
                };
            }
        } catch (error) {
            throw error;
        }
    }
}
