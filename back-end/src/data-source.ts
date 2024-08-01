import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { FormEntity } from "./entities/form.entity";
import { SubmittedFormEntity } from "./entities/submittedForm.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "formalo",
    synchronize: true,
    logging: false,
    entities: [UserEntity, FormEntity, SubmittedFormEntity],
    migrations: [],
    subscribers: [],
});
