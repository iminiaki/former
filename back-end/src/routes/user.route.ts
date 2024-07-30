import { UserService } from "../services/user.service";
import { Router } from "express";

export const makeUserRoute = (userService: UserService) => {
    const app = Router();

    //1-3
    app.post("/", (req, res) => {});

    //1-4
    app.get("/:formId", (req, res) => {});

    //1-1
    app.post("/addform", (req, res) => {});

    return app;
};
