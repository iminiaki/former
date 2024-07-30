import { User } from "../models/user.model";
import { Form } from "../models/form.model";

export interface CreateUser {
    name: string;
    password: string;
}

export interface IUserRepository {
    createUser(user: CreateUser): User;
    readUser(userId: number): User | undefined;
    updateUser(user: User): boolean;
    deleteUser(user: User): boolean;
    getAllUsers(): User[];
    readUserWithNamePassword(name: string, password: string): User | undefined;
    addForm(userId: number, formId: number): boolean;
}

export class UserRepository implements IUserRepository {
    private userRepo: User[];

    constructor() {
        this.userRepo = [
            { id: 1, name: "nadershah", password: "kohenoor", forms: [] },
        ];
    }

    private genId(): number {
        return this.userRepo.length + 1;
    }

    public createUser(user: CreateUser): User {
        const forms: number[] = [];
        const newUser: User = { ...user, id: this.genId(), forms: forms };
        this.userRepo.push(newUser);
        return newUser;
    }

    public readUser(userId: number): User | undefined {
        return this.userRepo.find((x) => x.id == userId);
    }

    public updateUser(user: User): boolean {
        try {
            const readUser = this.readUser(user.id);
            if (readUser) {
                readUser.name = user.name;
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    public deleteUser(user: User): boolean {
        try {
            const index = this.userRepo.indexOf(user);
            if (index >= 0) {
                this.userRepo.splice(index, 1);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    public getAllUsers(): User[] {
        return this.userRepo;
    }

    public readUserWithNamePassword(
        name: string,
        password: string
    ): User | undefined {
        return this.userRepo.find(
            (x) => x.name == name && x.password == password
        );
    }

    public addForm(userId: number, formId: number): boolean {
        const user = this.readUser(userId);
        if (!user) {
            return false;
        }
        user.forms.push(formId);
        return true;
    }
}
