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

        const form = formService.createForm({
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
    });

    describe('Publishing form', () => {
        it('shoud publish form and return url', () => {

        });
    });

    describe('Getting form', () => {
        it('should get form', async () => {
            const response = await request(app).get('/form/1');
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('poll');
        }); 
    });

});

