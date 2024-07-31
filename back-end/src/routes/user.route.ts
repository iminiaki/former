import { UserService } from "../services/user.service";
import { Router } from "express";
import { userDto } from "../dtos/getUserForms.dto";
import { handleExpress } from "../utilities/handleExpress";

export const makeUserRoute = (userService: UserService) => {
    const app = Router();

    //1-2
    app.put("/update/:id", (req, res) => {});

    //1-3
    app.post("/", (req, res) => {
        const dto = userDto.parse(req.body);
        handleExpress(res, async () => userService.getUserForms(dto));
    });

    //1-4
    app.get("/:formId", (req, res) => {
        const formId = Number(req.params.formId);
        const dto = userDto.parse(req.body);
        handleExpress(res, async () => userService.getFormWithId(dto, formId));
    });

    //1-1
    app.post("/addform", (req, res) => {});

    return app;
};
