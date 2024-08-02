import { DataSource, Repository } from "typeorm";
import { IUserRepository } from "../user.repository";
import { ISubmittedFormRepository } from "../submittedForm.repository";
import { SubmittedFormEntity } from "../../entities/submittedForm.entity";

export class SubmittedFormDbRepository implements ISubmittedFormRepository {
    private submittedFormRepo: Repository<SubmittedFormEntity>;
    constructor(appDataSource: DataSource) {
        this.submittedFormRepo =
            appDataSource.getRepository(SubmittedFormEntity);
    }
}
