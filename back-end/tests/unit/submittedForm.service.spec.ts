import { AppDataSource } from "../../src/data-source";
import {
    ISubmittedFormRepository,
    SubmittedFormDbRepository,
} from "../../src/repositories/db/submittedForm.dbRepository";
import { SubmittedFormService } from "../../src/services/submittedForm.service";
import { ForbiddenError } from "../../src/utilities/HttpError";
import { Express } from "express";

describe("Submitted form service test suite", () => {
    let submittedFormRepo: ISubmittedFormRepository;
    let submittedFormService: SubmittedFormService;
    let app: Express;

    beforeAll(async () => {
        // submittedFormRepo = new SubmittedFormRepository();
        // submittedFormService = new SubmittedFormService(submittedFormRepo);
        const dataSource = await AppDataSource.initialize();
        submittedFormRepo = new SubmittedFormDbRepository(dataSource);

        submittedFormService = new SubmittedFormService(submittedFormRepo);
    });
    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it("should create a new submitted form", async () => {
        const newSubmittedForm = await submittedFormService.createSubmittedForm(
            {
                email: "test@gmail.com",
                data: [
                    {
                        name: "age",
                        type: "number",
                        value: ["20"],
                    },
                ],
            }
        );
        expect(newSubmittedForm.email).toBe("test@gmail.com");
        expect(newSubmittedForm).toHaveProperty("data");
        expect(newSubmittedForm.data[0].value[0]).toBe("20");
    });

    it("should fail to create a new submitted form if email is already used in another submitted form", async () => {
        await submittedFormService.createSubmittedForm({
            email: "test@gmail.com",
            data: [
                {
                    name: "age",
                    type: "number",
                    value: ["20"],
                },
            ],
        });
        await expect(
            submittedFormService.createSubmittedForm({
                email: "test@gmail.com",
                data: [
                    {
                        name: "age",
                        type: "number",
                        value: ["21"],
                    },
                ],
            })
        ).rejects.toThrow(ForbiddenError);
    });

    it("should fail to create a new submitted form if email format is incorrect", async () => {
        await expect(() =>
            submittedFormService.createSubmittedForm({
                email: "wrong email format",
                data: [
                    {
                        name: "age",
                        type: "number",
                        value: ["21"],
                    },
                ],
            })
        ).rejects.toThrow(Error);
    });
});
