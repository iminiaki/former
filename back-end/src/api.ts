import express from "express";
import { SubmittedFormRepository } from "./repositories/submittedForm.repository";
import { FormRepository } from "./repositories/form.repository";
import { UserRepository } from "./repositories/user.repository";
import { SubmittedFormService } from "./services/submittedForm.servicec";
import { FormService } from "./services/form.service";
import { UserService } from "./services/user.service";
import { makeUserRoute } from "./routes/user.route";
import { makeFormRoute } from "./routes/form.route";

export const makeApp = () => {
    const app = express();
    app.use(express.json());

    const submittedFormRepo = new SubmittedFormRepository();
    const formRepo = new FormRepository();
    const userRepo = new UserRepository();

    const submittedFormService = new SubmittedFormService(submittedFormRepo);
    const formService = new FormService(formRepo, submittedFormService);
    const userService = new UserService(userRepo, formService);

    app.use("/user", makeUserRoute(userService));
    app.use("/form", makeFormRoute(formService));

    return app;
};
