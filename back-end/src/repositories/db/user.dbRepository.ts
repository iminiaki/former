import { DataSource, Repository } from "typeorm";
import { CreateUser, IUserRepository } from "../user.repository";
import { UserEntity } from "../../entities/user.entity";
import { FormEntity } from "../../entities/form.entity";

export class UserDbRepository implements IUserRepository {
    private userRepo: Repository<UserEntity>;
    constructor(appDataSource: DataSource) {
        this.userRepo = appDataSource.getRepository(UserEntity);
    }

    public async createUser(user: CreateUser): Promise<UserEntity> {
        const newUser = this.userRepo.create(user);
        await this.userRepo.save(newUser);
        return newUser;
    }

    public async readUser(userId: number): Promise<UserEntity | null> {
        return this.userRepo.findOneBy({ id: userId });
    }

    public async updateUser(user: UserEntity): Promise<boolean> {
        try {
            const result = await this.userRepo.update(user.id, user); 
            return result.affected !== 0;
        } catch {
            return false; 
        }
    }

    public async deleteUser(user: UserEntity): Promise<boolean> {
        try {
            const result = await this.userRepo.delete(user.id);
            return result.affected !== 0; 
        } catch {
            return false;
        }
    }

    public async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepo.find(); 
    }

    public async readUserWithNamePassword(name: string, password: string): Promise<UserEntity | null> {
        return this.userRepo.findOneBy({ name, password });
    }

    public async addForm(userId: number, formId: number): Promise<boolean> {
        try {
            const userEntity = await this.userRepo.findOneBy({ id: userId });
            if (!userEntity) {
                return false;
            }
            const formEntity = { id: formId } as FormEntity;
            userEntity.forms.push(formEntity);
            await this.userRepo.save(userEntity);
            return true;
        } catch {
            return false;
        }
    }
}
