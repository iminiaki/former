import { UserService } from "../services/user.service";
import { Router } from "express";
import { userDto } from "../dtos/getUserForms.dto";
import { handleExpress } from "../utilities/handleExpress";
import { formDto } from "../dtos/createForm.dto";
import { z } from "zod";

export const makeUserRoute = (userService: UserService) => {
    const app = Router();

    //1-2
    app.put("/update/:id", (req, res) => {
        const formId = z.coerce.number().parse(req.params.id);
        const user_dto = userDto.parse({
            name: req.body.user.name,
            password: req.body.user.password,
        });
        const form_dto = formDto.parse({
            name: req.body.form.name,
            description: req.body.form.description,
            elements: req.body.form.elements,
        });

        handleExpress(res, async () =>
            userService.updateForm(user_dto, formId, form_dto)
        );
    });

    //1-3
    app.post("/", (req, res) => {
        const dto = userDto.parse(req.body);
        handleExpress(res, async () => userService.getUserForms(dto));
    });

    //1-4
    app.get("/:formId", (req, res) => {
        const formId = z.coerce.number().parse(req.params.formId);
        const dto = userDto.parse(req.body);
        handleExpress(res, async () => userService.getFormWithId(dto, formId));
    });

    //1-1
    app.post("/addform", (req, res) => {
        const user_dto = userDto.parse({
            name: req.body.user.name,
            password: req.body.user.password,
        });
        const form_dto = formDto.parse({
            name: req.body.form.name,
            description: req.body.form.description,
            elements: req.body.form.elements,
        });
        handleExpress(res, async () => userService.addForm(user_dto, form_dto));
    });

    return app;
};
