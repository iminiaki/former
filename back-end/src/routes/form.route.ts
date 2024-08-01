import { FormService } from "../services/form.service";
import { Router } from "express";
import { handleExpress } from "../utilities/handleExpress";
import { CreateSubmittedFormDto } from "../dtos/createSubmittedForm.dto";
import { z } from "zod";

export const makeFormRoute = (formService: FormService) => {
    const app = Router();

    //2-2
    app.post("/:formId", (req, res) => {
        const formId = Number(req.params.formId);
        const dto = CreateSubmittedFormDto.parse(req.body);
        handleExpress(res, async () =>
            formService.addSubmittedForm(dto, formId)
        );
    });

    //3-1
    app.get("/response/:formId", (req, res) => {
        const formId = z.coerce.number().parse(req.params.formId);
        handleExpress(res, async () =>
            formService.getFormResponsesSummary(formId)
        );
    });

    //2-1
    app.get("/publish/:formId", (req, res) => {
        const formId = Number(req.params.formId);

        handleExpress(res, async () => {
            const formStatus = formService.switchFormStatus(formId);
            if (formStatus == "published") {
                const formURL =
                    req.protocol + "://" + req.get("host") + req.originalUrl;
                res.status(200).send(formStatus);
                return formURL;
            }
            res.status(200).send(formStatus);
            return;
        });
    });

    //8
    app.get("/:formId", (req, res) => {
        const formId = Number(req.params.formId);
        handleExpress(res, () => formService.getFormById(formId));
    });

    return app;
};
