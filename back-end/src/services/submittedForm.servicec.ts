import { CreateSubmittedFormDto } from "../dtos/createSubmittedForm.dto";
import { ISubmittedFormRepository } from "../repositories/submittedForm.repository";
import { ForbiddenError } from "../utilities/HttpError";

export class SubmittedFormService {
    constructor(private submittedFormRepo: ISubmittedFormRepository) {}

    createSubmittedForm(dto: CreateSubmittedFormDto) {
        try {
            CreateSubmittedFormDto.parse(dto);
        } catch (error) {          
            throw error;
        }

        if(this.submittedFormRepo.readSubmittedFormByEmail(dto.email)) {
            throw new ForbiddenError;
        }

        const newSubmittedForm = {
            email: dto.email,
            data: dto.data,
        };
        return this.submittedFormRepo.createSubmittedForm(newSubmittedForm)
    };

};
