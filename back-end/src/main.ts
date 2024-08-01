import { makeApp } from "./api";
import { FormRepository } from "./repositories/form.repository";
import { SubmittedFormRepository } from "./repositories/submittedForm.repository";
import { UserRepository } from "./repositories/user.repository";
import { FormService } from "./services/form.service";
import { SubmittedFormService } from "./services/submittedForm.service";
import { UserService } from "./services/user.service";

export const PORT = 3000;

const submittedFormRepo = new SubmittedFormRepository();
const submittedFormService = new SubmittedFormService(submittedFormRepo);
const formRepo = new FormRepository();
const formService = new FormService(formRepo, submittedFormService);
const userRepo = new UserRepository();
const userService = new UserService(userRepo, formService);

const app = makeApp(formService, userService);
app.listen(PORT, () => {
    console.log("listening on Port " + PORT);
});
