import express from "express";
import { FormService } from "./services/form.service";
import { UserService } from "./services/user.service";
import { makeUserRoute } from "./routes/user.route";
import { makeFormRoute } from "./routes/form.route";

export const makeApp = (formService: FormService, userService: UserService) => {
    const app = express();
    app.use(express.json());
    app.use("/user", makeUserRoute(userService));
    app.use("/form", makeFormRoute(formService));

    return app;
};
