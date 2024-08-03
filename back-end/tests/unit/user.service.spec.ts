import { AppDataSource } from "../../src/data-source";
import { FormDbRepository } from "../../src/repositories/db/form.dbRepository";
import {
    ISubmittedFormRepository,
    SubmittedFormDbRepository,
} from "../../src/repositories/db/submittedForm.dbRepository";
import {
    IUserRepository,
    UserDbRepository,
} from "../../src/repositories/db/user.dbRepository";

import { FormService } from "../../src/services/form.service";
import { SubmittedFormService } from "../../src/services/submittedForm.service";
import { UserForm, UserService } from "../../src/services/user.service";
import { ForbiddenError, NotFoundError } from "../../src/utilities/HttpError";
import { Express } from "express";

describe("User service test suite", () => {
    let formRepo: FormDbRepository;
    let submittedFormRepo: ISubmittedFormRepository;
    let formService: FormService;
    let submittedFormService: SubmittedFormService;

    let userRepo: IUserRepository;
    let userService: UserService;
    let app: Express;

    beforeAll(async () => {
        // userRepo = new UserRepository();
        // formRepo = new FormRepository();
        // submittedFormRepo = new SubmittedFormRepository();
        // submittedFormService = new SubmittedFormService(submittedFormRepo);
        // formService = new FormService(formRepo, submittedFormService);
        // userService = new UserService(userRepo, formService);

        const dataSource = await AppDataSource.initialize();
        submittedFormRepo = new SubmittedFormDbRepository(dataSource);

        submittedFormService = new SubmittedFormService(submittedFormRepo);

        formRepo = new FormDbRepository(dataSource);

        formService = new FormService(formRepo, submittedFormService);

        userRepo = new UserDbRepository(dataSource);
        userService = new UserService(userRepo, formService);

        await userRepo.createUser({
            name: "nadershah",
            password: "kohenoor"
        });
    });

    // afterAll(async () => {
    //     await AppDataSource.dropDatabase();
    //     await AppDataSource.destroy();
    // });

    it("should fail to get user forms if there is no user with that name and password", async () => {
        await expect(
            userService.getUserForms({
                name: "naser",
                password: "naserpass",
            })
        ).rejects.toThrow(NotFoundError);
    });

    it("should get empty array if user have no form", async () => {
        const result = await userService.getUserForms({
            name: "nadershah",
            password: "kohenoor",
        });
        expect(result.length).toBe(0);
    });

    it("should add a form to user", async () => {
        const newForm = await userService.addForm(
            { name: "nadershah", password: "kohenoor" },
            {
                name: "poll",
                description: "test",
                elements: [
                    {
                        name: "age",
                        type: "number",
                    },
                ],
            }
        );

        console.log(newForm)

        expect(newForm.name).toBe("poll");
        expect(newForm).toHaveProperty("description");
        expect(newForm.elements[0].type).toBe("number");

        const forms = await userService.getUserForms({
            name: "nadershah",
            password: "kohenoor",
        });

        console.log(await userRepo.getAllUsers())

        expect(forms[0].name).toBe("poll");
        expect(forms[0].description).toBe("test");
        expect(forms[0].status).toBe("draft");
    });

    it("should fail if user does not have specified form id", async () => {
        await expect(
            userService.getFormWithId(
                {
                    name: "nadershah",
                    password: "kohenoor",
                },
                2
            )
        ).rejects.toThrow(ForbiddenError);
    });

    it("should pass if every thing is ok", async () => {

        const newForm = await userService.addForm(
            { name: "nadershah", password: "kohenoor" },
            {
                name: "poll",
                description: "test",
                elements: [
                    {
                        name: "age",
                        type: "number",
                    },
                ],
            }
        );

        const formInfo = await userService.getFormWithId(
            {
                name: "nadershah",
                password: "kohenoor",
            },
            newForm.id
        );

        expect(formInfo).toHaveProperty("elements");
    });

    it("should pass if everything is ok in update form", async () => {
        const newForm = await userService.addForm(
            { name: "nadershah", password: "kohenoor" },
            {
                name: "poll",
                description: "test",
                elements: [
                    {
                        name: "age",
                        type: "number",
                    },
                ],
            }
        );

        const editedForm = await userService.updateForm(
            { name: "nadershah", password: "kohenoor" },
            newForm.id,
            {
                name: "poll_new",
                description: "test_new",
                elements: [
                    {
                        name: "weight",
                        type: "number",
                    },
                ],
            }
        );

        expect(editedForm?.name).toBe("poll_new");
        expect(editedForm?.description).toBe("test_new");
        expect(editedForm?.elements[0].name).toBe("weight");
    });
});
