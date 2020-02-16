import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn } from "typeorm";
import { Request } from "./Request";
import { EngineerRating } from "./EngineerRating";

@Entity()
export class Engineer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    rating: number;

    @Column()
    email: string;

    @Column()
    hash: string;

    @OneToMany(type => Request, request => request.engineer, 
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    requests: Request[];

    @OneToMany(type => EngineerRating, rating => rating.engineer,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ratings: EngineerRating[];

}