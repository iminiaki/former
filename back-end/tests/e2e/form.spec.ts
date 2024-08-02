import request from 'supertest';
import { Express } from 'express';
import { SubmittedFormService } from '../../src/services/submittedForm.service';
import { FormService } from '../../src/services/form.service';
import { makeApp } from '../../src/api';
import { Form } from '../../src/models/form.model';
import { UserService } from '../../src/services/user.service';
import { AppDataSource } from '../../src/data-source';
import { ISubmittedFormRepository, SubmittedFormDbRepository } from '../../src/repositories/db/submittedForm.dbRepository';
import { FormDbRepository, IFormRepository } from '../../src/repositories/db/form.dbRepository';
import { IUserRepository, UserDbRepository } from '../../src/repositories/db/user.dbRepository';

describe('Form test suite', () => {
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

        form = await formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
        formService.switchFormStatus(form.id);

        formService.createForm({
            name: "poll",
            description: "test",
            elements: [
                {
                    name: "age",
                    type: "number",
                },
            ],
        });
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    describe('Getting form', () => {
        it('should get form', async () => {
            const response = await request(app).get('/form/1');
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('poll');
        });

        it('should fail to get form if id does not exist', async () => {
            const response = await request(app).get('/form/3');
            expect(response.status).toBe(404);
        });

        it('should fail to get form if form is drafted', async () => {
            const response = await request(app).get('/form/2');
            expect(response.status).toBe(403);
        });
    });

    describe('Publishing form', () => {
        it('should draft published form', async () => {
            const response = await request(app).get('/form/publish/1');
            expect(response.status).toBe(200);
        });

        it('should publish form and return a link to it', async () => {
            const response = await request(app).get('/form/publish/2');
            expect(response.status).toBe(200);
            //TODO: mock location to test return link
        });
    });

    describe('Submitting filled form', () => {
        it('should submit form', async () => {
            const response = await request(app).post('/form/2').send({
                email: "test@gmail.com",
                data: [
                    {
                        name: "age",
                        type: "number",
                        value: ["20"],
                    },
                ],
            });
            expect(response.status).toBe(200);
            expect(response.body).toBe(true);
        });

        it('should fail to submit form if there are conflicts', async () => {
            const response = await request(app).post('/form/2').send({
                email: "test2@gmail.com",
                data: [
                    {
                        name: "age",
                        type: "number",
                        value: ["20"],
                    },
                    {
                        name: "gender",
                        type: "radio",
                        value: ["male"],
                    },
                ],
            });
            expect(response.status).toBe(409);
        });

        it('should fail to submit form if form is not found', async () => {
            const response = await request(app).post('/form/5').send({
                email: "test@gmail.com",
                data: [
                    {
                        name: "age",
                        type: "number",
                        value: ["20"],
                    },
                ],
            });
            expect(response.status).toBe(404);
        });

        it('should fail to submit form if form is drafted', async () => {
            const response = await request(app).post('/form/1').send({
                email: "test@gmail.com",
                data: [
                    {
                        name: "age",
                        type: "number",
                        value: ["20"],
                    },
                ],
            });
            expect(response.status).toBe(403);
        })
    });

    describe('Getting form responses', () => {
        it('should get response', async () => {
            const response = await request(app).get('/form/response/2');
            expect(response.status).toBe(200);
            expect(Object.keys(response.body)[0]).toBe("test@gmail.com");
        });

        it('should fail to get response if form does not exist', async () => {
            const response = await request(app).get('/form/response/5');
            expect(response.status).toBe(404);
        });
    });

});

