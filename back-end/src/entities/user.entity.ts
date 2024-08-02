import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormEntity } from "./form.entity";
@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @OneToMany(() => FormEntity, (form) => form.user, {
        cascade: ["insert"],
    })
    forms!: FormEntity[];
}
