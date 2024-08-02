import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { FormElementWithValue } from "../models/formElementWithValue.model";
import { FormEntity } from "./form.entity";

@Entity("submittedForms")
export class SubmittedFormEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    email!: string;

    @Column("jsonb")
    data!: FormElementWithValue[];

    @ManyToOne(() => FormEntity)
    form!: FormEntity;
}
