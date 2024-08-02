import { DataSource, Repository } from "typeorm";
import { IUserRepository } from "../user.repository";
import { UserEntity } from "../../entities/user.entity";

export class UserDbRepository implements IUserRepository {
    private userRepo: Repository<UserEntity>;
    constructor(appDataSource: DataSource) {
        this.userRepo = appDataSource.getRepository(UserEntity);
    }
}
