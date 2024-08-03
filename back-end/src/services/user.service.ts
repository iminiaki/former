import { FormDto, formDto } from "../dtos/createForm.dto";
import { userDto, UserDto } from "../dtos/getUserForms.dto";
import { FormEntity } from "../entities/form.entity";
import { Form } from "../models/form.model";
import { FormElement } from "../models/formElement.model";
import { IUserRepository } from "../repositories/db/user.dbRepository";
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

        const user = await this.userRepo.readUserWithNamePassword(
            dto.name,
            dto.password
        );
        if (!user) {
            throw new NotFoundError();
        }

        if (!user.forms) {
            return userForms;
        }

        const fullUserForms: Form[] = user.forms

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

    async addForm(user_dto: UserDto, dto: FormDto) {
        try {
            userDto.parse(user_dto);
        } catch (error) {
            throw error;
        }

        const user = await this.userRepo.readUserWithNamePassword(
            user_dto.name,
            user_dto.password
        );
        if (!user) {
            throw new NotFoundError();
        }

        try {
            const createdForm: Form = await this.formService.createForm(dto);
            const addedForm: Form = await this.formService.addFormToUser(createdForm, user.id)
            // if (!this.userRepo.addForm(user.id, createdForm.id)) {
            //     throw new NotFoundError();
            // }

            return addedForm;
        } catch (error) {
            throw error;
        }
    }

    async getFormWithId(user_dto: UserDto, formId: number) {
        try {
            userDto.parse(user_dto);
        } catch (error) {
            throw error;
        }

        const user = await this.userRepo.readUserWithNamePassword(
            user_dto.name,
            user_dto.password
        );
        if (!user) {
            throw new NotFoundError();
        }

        user.forms.forEach((form) => {
            if(form.id == formId) {
                throw new ForbiddenError();
            }
        })

        const readedForm = await this.formService.readFormById(formId);
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

    async updateForm(user_dto: UserDto, formId: number, formDto: FormDto) {
        try {
            userDto.parse(user_dto);
        } catch (error) {
            throw error;
        }

        const user = await this.userRepo.readUserWithNamePassword(
            user_dto.name,
            user_dto.password
        );
        if (!user) {
            throw new NotFoundError();
        }

        user.forms.forEach((form) => {
            if(form.id == formId) {
                throw new ForbiddenError();
            }
        })

        const readedForm = await this.formService.readFormById(formId);
        if (!readedForm) {
            throw new NotFoundError();
        }

        if (readedForm.submittedForms.length != 0) {
            throw new ForbiddenError();
        }

        try {
            const updateResult = await this.formService.updateForm({
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
