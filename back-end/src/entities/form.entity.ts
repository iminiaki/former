import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { FormElement } from "../models/formElement.model";
import { SubmittedFormEntity } from "./submittedForm.entity";

@Entity("forms")
export class FormEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column("jsonb")
    elements!: FormElement[];

    @Column({
        type: "enum",
        enum: ["published", "draft"],
    })
    status!: "published" | "draft";

    @OneToMany(
        () => SubmittedFormEntity,
        (submittedForm) => submittedForm.form,
        {
            cascade: ["insert"],
        }
    )
    submittedForms!: SubmittedFormEntity[];

    @ManyToOne(() => UserEntity, (user) => user.forms, { onDelete: 'CASCADE'})
    user!: UserEntity;
}
