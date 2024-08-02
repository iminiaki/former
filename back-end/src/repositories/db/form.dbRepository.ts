import { DataSource, Repository } from "typeorm";
import { IUserRepository } from "../user.repository";
import { FormEntity } from "../../entities/form.entity";
import { IFormRepository } from "../form.repository";

export class FormDbRepository implements IFormRepository {
    private formRepo: Repository<FormEntity>;
    constructor(appDataSource: DataSource) {
        this.formRepo = appDataSource.getRepository(FormEntity);
    }
}
