import { UserEntity } from "../entities/user.entity";
import { Form } from "../models/form.model";
import { User } from "../models/user.model";
import { IUserRepository } from "./db/user.dbRepository";

// export interface CreateUser {
//     name: string;
//     password: string;
//     forms: Form[];
// }

// export class UserRepository implements IUserRepository {
//     private userRepo: User[];

//     constructor() {
//         this.userRepo = [
//             { id: 1, name: "nadershah", password: "kohenoor", forms: [] },
//         ];
//     }

//     private genId(): number {
//         return this.userRepo.length + 1;
//     }

//     public async createUser(user: CreateUser): Promise<User> {
//         const forms: number[] = [];
//         const newUser: User = { ...user, id: this.genId(), forms: forms };
//         this.userRepo.push(newUser);
//         return newUser;
//     }

//     public async readUser(userId: number): Promise<User | undefined> {
//         return this.userRepo.find((x) => x.id == userId);
//     }

//     public async updateUser(user: User): Promise<boolean> {
//         try {
//             const readUser = await this.readUser(user.id);
//             if (readUser) {
//                 readUser.name = user.name;
//                 return true;
//             }
//             return false;
//         } catch (e) {
//             return false;
//         }
//     }

//     public async deleteUser(user: User): Promise<boolean> {
//         try {
//             const index = this.userRepo.indexOf(user);
//             if (index >= 0) {
//                 this.userRepo.splice(index, 1);
//                 return true;
//             }
//             return false;
//         } catch (e) {
//             return false;
//         }
//     }

//     public async getAllUsers(): Promise<User[]> {
//         return this.userRepo;
//     }

//     public async readUserWithNamePassword(
//         name: string,
//         password: string
//     ): Promise<User | undefined> {
//         return this.userRepo.find(
//             (x) => x.name == name && x.password == password
//         );
//     }

//     public async addForm(userId: number, formId: number): Promise<boolean> {
//         const user = await this.readUser(userId);
//         if (!user) {
//             return false;
//         }
//         user.forms.push(formId);
//         return true;
//     }
// }
