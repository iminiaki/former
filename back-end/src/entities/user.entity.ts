import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { FormEntity } from "./form.entity";
@Entity("user")
export class UserEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @OneToMany(() => FormEntity, (form) => form.user, {
        cascade: ["insert"],
    })
    forms!: FormEntity[];
}
