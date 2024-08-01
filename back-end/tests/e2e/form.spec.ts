import request from 'supertest';
import { Express } from 'express';
import { SubmittedFormRepository } from '../../src/repositories/submittedForm.repository';
import { FormRepository } from '../../src/repositories/form.repository';
import { SubmittedFormService } from '../../src/services/submittedForm.service';
import { FormService } from '../../src/services/form.service';
import { makeApp } from '../../src/api';
import { Form } from '../../src/models/form.model';
import { UserRepository } from '../../src/repositories/user.repository';
import { UserService } from '../../src/services/user.service';

describe('Form test suite', () => {
    let submittedFormRepo: SubmittedFormRepository;
    let submittedFormService: SubmittedFormService;
    let formRepo: FormRepository;
    let formService: FormService;
    let userRepo: UserRepository;
    let userService: UserService;
    let app: Express;
    let form: Form;

    beforeAll(() => {
        submittedFormRepo = new SubmittedFormRepository();
        submittedFormService = new SubmittedFormService(submittedFormRepo);
        formRepo = new FormRepository();
        formService = new FormService(formRepo, submittedFormService);
        userRepo = new UserRepository();
        userService = new UserService(userRepo, formService);
        app = makeApp(formService, userService);

        form = formService.createForm({
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

