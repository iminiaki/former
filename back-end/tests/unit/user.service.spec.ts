import {
    FormRepository,
    IFormRepository,
} from "../../src/repositories/form.repository";
import {
    ISubmittedFormRepository,
    SubmittedFormRepository,
} from "../../src/repositories/submittedForm.repository";
import {
    IUserRepository,
    UserRepository,
} from "../../src/repositories/user.repository";
import { FormService } from "../../src/services/form.service";
import { SubmittedFormService } from "../../src/services/submittedForm.servicec";
import { UserForm, UserService } from "../../src/services/user.service";
import { ForbiddenError, NotFoundError } from "../../src/utilities/HttpError";

describe("User service test suite", () => {
    let userRepo: IUserRepository;
    let formRepo: IFormRepository;
    let formService: FormService;
    let userService: UserService;
    let submittedFormRepo: ISubmittedFormRepository;
    let submittedFormService: SubmittedFormService;

    beforeEach(() => {
        userRepo = new UserRepository();
        formRepo = new FormRepository();
        submittedFormRepo = new SubmittedFormRepository();
        submittedFormService = new SubmittedFormService(submittedFormRepo);
        formService = new FormService(formRepo, submittedFormService);
        userService = new UserService(userRepo, formService);
    });

    it("should fail to get user forms if there is no user with that name and password", () => {
        expect(() => {
            userService.getUserForms({
                name: "naser",
                password: "naserpass",
            });
        }).toThrow(NotFoundError);
    });

    it("should get empty array if user have no form", () => {
        const result = userService.getUserForms({
            name: "nadershah",
            password: "kohenoor",
        });
        expect(result.length).toBe(0);
    });

    it("should add a form to user", () => {
        const newForm = userService.addForm(
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

        expect(newForm.name).toBe("poll");
        expect(newForm).toHaveProperty("description");
        expect(newForm.elements[0].type).toBe("number");

        const forms = userService.getUserForms({
            name: "nadershah",
            password: "kohenoor",
        });

        expect(forms[0].name).toBe("poll");
        expect(forms[0].description).toBe("test");
        expect(forms[0].status).toBe("draft");
    });

    it("should fail if user does not have specified form id", () => {
        expect(() =>
            userService.getFormWithId(
                {
                    name: "nadershah",
                    password: "kohenoor",
                },
                2
            )
        ).toThrow(ForbiddenError);
    });

    it("should pass if every thing is ok", () => {
        const newForm = userService.addForm(
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

        const formInfo = userService.getFormWithId(
            {
                name: "nadershah",
                password: "kohenoor",
            },
            newForm.id
        );

        expect(formInfo).toHaveProperty("elements");
    });

    it("should pass if everything is ok in update form", () => {
        const newForm = userService.addForm(
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

        const editedForm = userService.updateForm(
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
