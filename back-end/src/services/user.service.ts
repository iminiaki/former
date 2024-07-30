import { IUserRepository } from "../repositories/user.repository";
import { FormService } from "./form.service";

export class UserService {
    constructor(
        private userRepo: IUserRepository,
        private formService: FormService
    ) {}
}
