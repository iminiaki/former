import { FormRepository } from "../../src/repositories/form.repository";
import { SubmittedFormRepository } from "../../src/repositories/submittedForm.repository";
import { FormService } from "../../src/services/form.service";
import { SubmittedFormService } from "../../src/services/submittedForm.servicec";
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

    beforeEach(() => {
        formRepo = new FormRepository();
        submittedFormRepo = new SubmittedFormRepository();
        submittedFormService = new SubmittedFormService(submittedFormRepo);
        formService = new FormService(formRepo, submittedFormService);
    });

    it("should add a new form", () => {
        const newForm = formService.createForm({
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

    it("should fail to create a new form if there are no elements", () => {
        expect(() =>
            formService.createForm({
                name: "poll",
                description: "test",
                elements: [],
            })
        ).toThrow(Error);
    });

    // need to add published method and publish form to work
    // it('should add a submitted form to form', () => {
    //     const newForm = formService.createForm(
    //         {
    //             name: "poll",
    //             description: "test",
    //             elements: [{
    //                 name: "age",
    //                 type: "number",
    //             }],
    //         }
    //     );
    //     expect(formService.addSubmittedForm({
    //         email: "test@gmail.com",
    //         data: [{
    //             name: "age",
    //             type: "number",
    //             value: "20",
    //         }],
    //     }, newForm.id)).toBe(true);
    //     expect(newForm.submittedForms.length).toBe(1);
    // });

    it("should fail to add a submitted form to a draft form", () => {
        const newForm = formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
        expect(() =>
            formService.addSubmittedForm(
                {
                    email: "test@gmail.com",
                    data: [
                        {
                            name: "age",
                            type: "number",
                            value: "20",
                        },
                    ],
                },
                newForm.id
            )
        ).toThrow(ForbiddenError);
    });

    it("should fail to add a submitted form if it does not exist", () => {
        expect(() =>
            formService.addSubmittedForm(
                {
                    email: "test@gmail.com",
                    data: [
                        {
                            name: "age",
                            type: "number",
                            value: "20",
                        },
                    ],
                },
                1
            )
        ).toThrow(NotFoundError);
    });

    // need to add published method and publish form to work
    // it('should fail to add a submitted form to form if there is conflict in elements', () => {
    //     const newForm = formService.createForm(
    //         {
    //             name: "poll",
    //             description: "test",
    //             elements: [{
    //                 name: "age",
    //                 type: "number",
    //             }],
    //         }
    //     );
    //     expect(() => formService.addSubmittedForm({
    //         email: "test@gmail.com",
    //         data: [{
    //             name: "age",
    //             type: "number",
    //             value: "20",
    //         },
    //         {
    //             name: "gender",
    //             type: "select",
    //             options: ["male", "female"],
    //             value: "male"
    //         },
    //     ],
    //     }, newForm.id)).toThrow(new HttpError(409, "Conflict"));
    //     expect(newForm.submittedForms.length).toBe(1);
    // });
});
