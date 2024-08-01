import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { FormElementWithValue } from "../models/formElementWithValue.model";
import { FormEntity } from "./form.entity";

@Entity("submittedForms")
export class SubmittedFormEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    email!: string;

    @Column()
    data!: FormElementWithValue[];

    @ManyToOne(() => FormEntity)
    form!: FormEntity;
}
