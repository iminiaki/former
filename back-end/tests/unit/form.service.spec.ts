import { FormRepository } from "../../src/repositories/form.repository";
import { SubmittedFormRepository } from "../../src/repositories/submittedForm.repository";
import {
    IUserRepository,
    UserRepository,
} from "../../src/repositories/user.repository";
import { FormService } from "../../src/services/form.service";
import { SubmittedFormService } from "../../src/services/submittedForm.service";
import { UserService } from "../../src/services/user.service";
import {
    ForbiddenError,
    HttpError,
    NotFoundError,
} from "../../src/utilities/HttpError";

describe("Form service test suite", () => {
    let formRepo: FormRepository;
    let submittedFormRepo: SubmittedFormRepository;
    let formService: FormService;
    let submittedFormService: SubmittedFormService;

    let userRepo: IUserRepository;
    let userService: UserService;

    beforeEach(() => {
        formRepo = new FormRepository();
        submittedFormRepo = new SubmittedFormRepository();
        submittedFormService = new SubmittedFormService(submittedFormRepo);
        formService = new FormService(formRepo, submittedFormService);

        userRepo = new UserRepository();
        userService = new UserService(userRepo, formService);
    });

    it("should add a new form", async () => {
        const newForm = await formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
        expect(newForm.name).toBe("poll");
        expect(newForm).toHaveProperty("description");
        expect(newForm.elements[0].type).toBe("number");
    });

    it("should fail to create a new form if there are no elements", async () => {
        await expect(() =>
            formService.createForm({
                name: "poll",
                description: "test",
                elements: [],
            })
        ).rejects.toThrow(Error);
    });

    it("should add a submitted form to form", async () => {
        const newForm = await formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
        formService.switchFormStatus(newForm.id);
        expect(
            await formService.addSubmittedForm(
                {
                    email: "test@gmail.com",
                    data: [
                        {
                            name: "age",
                            type: "number",
                            value: ["20"],
                        },
                    ],
                },
                newForm.id
            )
        ).toBe(true);
        expect(newForm.submittedForms.length).toBe(1);
    });

    it("should fail to add a submitted form to a draft form", async () => {
        const newForm = await formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
        await expect(() =>
            formService.addSubmittedForm(
                {
                    email: "test@gmail.com",
                    data: [
                        {
                            name: "age",
                            type: "number",
                            value: ["20"],
                        },
                    ],
                },
                newForm.id
            )
        ).rejects.toThrow(ForbiddenError);
    });

    it("should fail to add a submitted form if it does not exist", async () => {
        await expect(() =>
            formService.addSubmittedForm(
                {
                    email: "test@gmail.com",
                    data: [
                        {
                            name: "age",
                            type: "number",
                            value: ["20"],
                        },
                    ],
                },
                1
            )
        ).rejects.toThrow(NotFoundError);
    });

    it("should fail to add a submitted form to form if there is conflict in elements", async () => {
        const newForm = await formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
        formService.switchFormStatus(newForm.id);
        await expect(() =>
            formService.addSubmittedForm(
                {
                    email: "test@gmail.com",
                    data: [
                        {
                            name: "age",
                            type: "number",
                            value: ["20"],
                        },
                        {
                            name: "gender",
                            type: "radio",
                            options: ["male", "female"],
                            value: ["male"],
                        },
                    ],
                },
                newForm.id
            )
        ).rejects.toThrow(new HttpError(409, "Conflict"));
    });

    it("shoud switch form status", async () => {
        const newForm = await formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
        expect(await formService.switchFormStatus(newForm.id)).toBe("published");
        expect(await formService.switchFormStatus(newForm.id)).toBe("draft");
    });

    it("should get form reponses", async () => {
        const newForm = await formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
        await formService.switchFormStatus(newForm.id);
        await formService.addSubmittedForm(
            {
                email: "test@gmail.com",
                data: [
                    {
                        name: "age",
                        type: "number",
                        value: ["20"],
                    },
                ],
            },
            newForm.id
        );
        const responses = await formService.getFormResponses(newForm.id);
        expect(Object.keys(responses)[0]).toBe("test@gmail.com");
    });

    it("should fail to get responses if form id is not found", async () => {
        await expect(() => formService.getFormResponses(1)).rejects.toThrow(NotFoundError);
    });

    it("get form elements", async () => {
        const newForm = await formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });

        const elements = await formService.getFormElements(newForm.id);
        expect(elements[0].name).toBe("age");
        expect(elements[0].type).toBe("number");
    });

    // it("should return empty respose if form have no submittedForm", () => {
    //     const newForm = userService.addForm(
    //         { name: "nadershah", password: "kohenoor" },
    //         {
    //             name: "poll",
    //             description: "test",
    //             elements: [
    //                 {
    //                     name: "age",
    //                     type: "number",
    //                 },
    //                 {
    //                     name: "graduated",
    //                     type: "radio",
    //                     options: ["yes", "no"],
    //                 },
    //             ],
    //         }
    //     );

    //     const response = formService.getFormResponsesSummary(newForm.id);
    //     expect(response).toHaveProperty("summarySelwctQuestions");
    //     expect(response).toHaveProperty("summaryTextQuestions");
    //     expect(response.summarySelwctQuestions.length).toBe(0);
    //     expect(response.summaryTextQuestions.length).toBe(0);
    // });

    // it("should return response summary", () => {
    //     const newForm = userService.addForm(
    //         { name: "nadershah", password: "kohenoor" },
    //         {
    //             name: "poll",
    //             description: "test",
    //             elements: [
    //                 {
    //                     name: "age",
    //                     type: "number",
    //                 },
    //                 {
    //                     name: "graduated",
    //                     type: "option",
    //                     options: ["yes", "no"],
    //                 },
    //             ],
    //         }
    //     );
    //     formService.switchFormStatus(newForm.id);
    //     formService.addSubmittedForm(
    //         {
    //             email: "test@gmail.com",
    //             data: [
    //                 {
    //                     name: "age",
    //                     type: "number",
    //                     value: "20",
    //                 },
    //                 {
    //                     name: "graduated",
    //                     type: "option",
    //                     value: "yes",
    //                 },
    //             ],
    //         },
    //         newForm.id
    //     );
    //     const response = formService.getFormResponsesSummary(newForm.id);
    //     expect(response).toHaveProperty("summarySelwctQuestions");
    //     expect(response).toHaveProperty("summaryTextQuestions");
    //     expect(response.summaryTextQuestions[0].name).toBe("age");
    //     expect(response.summaryTextQuestions[0].responses[0]).toBe("20");
    //     expect(response.summarySelwctQuestions[0].name).toBe("graduated");
    //     expect(response.summarySelwctQuestions[0].responses[0].option).toBe(
    //         "yes"
    //     );
    //     expect(response.summarySelwctQuestions[0].responses[0].count).toBe(1);
    //     expect(response.summarySelwctQuestions[0].responses[1].option).toBe(
    //         "no"
    //     );
    //     expect(response.summarySelwctQuestions[0].responses[1].count).toBe(0);
    // });
});
