import { makeApp } from "./api";

import { FormService } from "./services/form.service";
import { SubmittedFormService } from "./services/submittedForm.service";
import { UserService } from "./services/user.service";
import { AppDataSource } from "./data-source";
import { SubmittedFormDbRepository } from "./repositories/db/submittedForm.dbRepository";
import { FormDbRepository } from "./repositories/db/form.dbRepository";
import { UserDbRepository } from "./repositories/db/user.dbRepository";

export const PORT = 3000;

AppDataSource.initialize().then((dataSource) => {
    // const submittedFormRepo = new SubmittedFormRepository();
    const submittedFormDbRepo = new SubmittedFormDbRepository(dataSource);

    // const submittedFormService = new SubmittedFormService(submittedFormRepo);
    const submittedFormService = new SubmittedFormService(submittedFormDbRepo);

    // const formRepo = new FormRepository();
    const formDbRepo = new FormDbRepository(dataSource);

    // const formService = new FormService(formRepo, submittedFormService);
    const formService = new FormService(formDbRepo, submittedFormService);

    // const userRepo = new UserRepository();
    const userDbRepo = new UserDbRepository(dataSource);

    // const userService = new UserService(userRepo, formService);
    const userService = new UserService(userDbRepo, formService);

    const app = makeApp(formService, userService);
    app.listen(PORT, () => {
        console.log("listening on Port " + PORT);
    });
});

// const app = makeApp(formService, userService);
// app.listen(PORT, () => {
//     console.log("listening on Port " + PORT);
// });
