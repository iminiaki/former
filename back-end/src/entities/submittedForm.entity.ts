import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormElementWithValue } from "../models/formElementWithValue.model";
import { FormEntity } from "./form.entity";

@Entity("submittedForms")
export class SubmittedFormEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column("jsonb")
    data!: FormElementWithValue[];

    @ManyToOne(() => FormEntity, { onDelete: 'CASCADE'})
    form!: FormEntity;
}
