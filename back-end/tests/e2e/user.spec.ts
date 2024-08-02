import { Express } from "express";
import { SubmittedFormService } from "../../src/services/submittedForm.service";
import { FormService } from "../../src/services/form.service";
import { makeApp } from "../../src/api";
import { Form } from "../../src/models/form.model";
import { UserService } from "../../src/services/user.service";
import request from "supertest";
import { ISubmittedFormRepository, SubmittedFormDbRepository } from "../../src/repositories/db/submittedForm.dbRepository";
import { FormDbRepository, IFormRepository } from "../../src/repositories/db/form.dbRepository";
import { IUserRepository, UserDbRepository } from "../../src/repositories/db/user.dbRepository";
import { AppDataSource } from "../../src/data-source";

describe("user e2e test sutie", () => {
    let submittedFormRepo: ISubmittedFormRepository;
    let submittedFormService: SubmittedFormService;
    let formRepo: IFormRepository;
    let formService: FormService;
    let userRepo: IUserRepository;
    let userService: UserService;
    let app: Express;
    let form: Form;

    beforeAll(async () => {
        const dataSource = await AppDataSource.initialize();
        submittedFormRepo = new SubmittedFormDbRepository(dataSource);
        submittedFormService = new SubmittedFormService(submittedFormRepo);
        formRepo = new FormDbRepository(dataSource);
        formService = new FormService(formRepo, submittedFormService);
        userRepo = new UserDbRepository(dataSource);
        userService = new UserService(userRepo, formService);
        app = makeApp(formService, userService);
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    describe("addform", () => {
        it("should fail if name and password not valid", async () => {
            const { body: form } = await request(app)
                .post("/user/addform")
                .send({
                    user: {
                        name: "babak",
                        password: "khan",
                    },
                    form: {
                        name: "poll",
                        description: "test",
                        elements: [
                            {
                                name: "age",
                                type: "number",
                            },
                            {
                                name: "graduated",
                                type: "radio",
                                options: ["yes", "no"],
                            },
                        ],
                    },
                })
                .expect(404);
        });

        it("should pass if name and password valid and form is valid too", async () => {
            const { body: form } = await request(app)
                .post("/user/addform")
                .send({
                    user: {
                        name: "nadershah",
                        password: "kohenoor",
                    },
                    form: {
                        name: "poll",
                        description: "test",
                        elements: [
                            {
                                name: "age",
                                type: "number",
                            },
                            {
                                name: "graduated",
                                type: "radio",
                                options: ["yes", "no"],
                            },
                        ],
                    },
                })
                .expect(200);
        });
    });

    describe("getform", () => {
        it("should fail if user do not have that from with specified formId", async () => {
            const { body: form } = await request(app)
                .get("/user/2")
                .send({
                    name: "nadershah",
                    password: "kohenoor",
                })
                .expect(403);
        });

        it("should pass getform", async () => {
            const { body: createdform } = await request(app)
                .post("/user/addform")
                .send({
                    user: {
                        name: "nadershah",
                        password: "kohenoor",
                    },
                    form: {
                        name: "poll",
                        description: "test",
                        elements: [
                            {
                                name: "age",
                                type: "number",
                            },
                            {
                                name: "graduated",
                                type: "radio",
                                options: ["yes", "no"],
                            },
                        ],
                    },
                });

            const { body: form } = await request(app)
                .get(`/user/${createdform.id}`)
                .send({
                    name: "nadershah",
                    password: "kohenoor",
                })
                .expect(200);
        });
    });

    describe("get user forms", () => {
        it("should get user forms", async () => {
            const { body: forms } = await request(app)
                .post("/user")
                .send({
                    name: "nadershah",
                    password: "kohenoor",
                })
                .expect(200);
        });
    });

    describe("update form", () => {
        it("should fail if user does not have specifed formId", async () => {
            const { body: updatedForm } = await request(app)
                .put("/user/update/1000")
                .send({
                    user: {
                        name: "nadershah",
                        password: "kohenoor",
                    },
                    form: {
                        name: "poll3",
                        description: "test3",
                        elements: [
                            {
                                name: "age",
                                type: "number",
                            },
                            {
                                name: "graduated",
                                type: "radio",
                                options: ["yes", "no"],
                            },
                        ],
                    },
                })
                .expect(403);
        });
        it("should update the form", async () => {
            const { body: createdform } = await request(app)
                .post("/user/addform")
                .send({
                    user: {
                        name: "nadershah",
                        password: "kohenoor",
                    },
                    form: {
                        name: "poll2",
                        description: "test2",
                        elements: [
                            {
                                name: "age",
                                type: "number",
                            },
                            {
                                name: "graduated",
                                type: "radio",
                                options: ["yes", "no"],
                            },
                        ],
                    },
                });

            const { body: updatedForm } = await request(app)
                .put(`/user/update/${createdform.id}`)
                .send({
                    user: {
                        name: "nadershah",
                        password: "kohenoor",
                    },
                    form: {
                        name: "poll3",
                        description: "test3",
                        elements: [
                            {
                                name: "age",
                                type: "number",
                            },
                            {
                                name: "graduated",
                                type: "radio",
                                options: ["yes", "no"],
                            },
                        ],
                    },
                })
                .expect(200);
            expect(updatedForm.name).toBe("poll3");
            expect(updatedForm.description).toBe("test3");
        });
    });
});
