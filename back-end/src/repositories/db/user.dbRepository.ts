import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";
import { FormEntity } from "../../entities/form.entity";
import { User } from "../../models/user.model";
import { Form } from "../../models/form.model";

export interface CreateUser {
    name: string;
    password: string;
    forms: Form[];
}

export interface IUserRepository {
    createUser(user: CreateUser): Promise<User>;
    readUser(userId: number): Promise<User | null>;
    updateUser(user: User): Promise<boolean>;
    deleteUser(user: User): Promise<boolean>;
    getAllUsers(): Promise<User[]>;
    readUserWithNamePassword(
        name: string,
        password: string
    ): Promise<User | null>;
    addForm(userId: number, formId: number): Promise<boolean>;
}

export class UserDbRepository implements IUserRepository {
    private userRepo: Repository<UserEntity>;
    constructor(appDataSource: DataSource) {
        this.userRepo = appDataSource.getRepository(UserEntity);
    }

    public async createUser(user: CreateUser): Promise<User> {
        const newUser = this.userRepo.create(user);
        await this.userRepo.save(newUser);
        return newUser;
    }

    public async readUser(userId: number): Promise<User | null> {
        return this.userRepo.findOneBy({ id: userId });
    }

    public async updateUser(user: User): Promise<boolean> {
        try {
            const result = await this.userRepo.update(user.id, user);
            return result.affected !== 0;
        } catch {
            return false;
        }
    }

    public async deleteUser(user: User): Promise<boolean> {
        try {
            const result = await this.userRepo.delete(user.id);
            return result.affected !== 0;
        } catch {
            return false;
        }
    }

    public async getAllUsers(): Promise<User[]> {
        return this.userRepo.find();
    }

    public async readUserWithNamePassword(
        name: string,
        password: string
    ): Promise<User | null> {
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
