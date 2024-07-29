import { FormService } from "../services/form.service";
import { Router } from "express";

export const makeFormRoute = (formService: FormService) => {
    const app = Router();

    //1-2
    app.put("/update/:id", (req, res) => {});

    //2-2
    app.post("/:formId", (req, res) => {});

    //3-1
    app.get("/response/:formId", (req, res) => {});

    //2-1
    app.get("/publish/:formId", (req, res) => {});

    //8
    app.get("/:formId", (req, res) => {});

    return app;
};
