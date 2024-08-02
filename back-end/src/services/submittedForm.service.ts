import { CreateSubmittedFormDto } from "../dtos/createSubmittedForm.dto";
import { ISubmittedFormRepository } from "../repositories/db/submittedForm.dbRepository";
import { ForbiddenError, NotFoundError } from "../utilities/HttpError";

export class SubmittedFormService {
    constructor(private submittedFormRepo: ISubmittedFormRepository) {}

    async createSubmittedForm(dto: CreateSubmittedFormDto) {
        try {
            CreateSubmittedFormDto.parse(dto);
        } catch (error) {
            throw error;
        }

        const submittedForm =
            await this.submittedFormRepo.readSubmittedFormByEmail(dto.email);

        if (submittedForm) {
            throw new ForbiddenError();
        }

        const newSubmittedForm = {
            email: dto.email,
            data: dto.data,
        };
        return this.submittedFormRepo.createSubmittedForm(newSubmittedForm);
    }

    async readSubmittedFormById(id: number) {
        const submittedForm =
            await this.submittedFormRepo.readSubmittedFormById(id);
        if (!submittedForm) {
            throw new NotFoundError();
        }
        return submittedForm;
    }
}
