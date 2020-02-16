import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne, 
    CreateDateColumn,
    UpdateDateColumn } from "typeorm";
import { Engineer } from "./Engineer";
import { Shop } from "./Shop";

export enum RequestStatus {
    PENDING = "pending",
    ONGOING = "ongoing",
    DONE = "done"
}

@Entity()
export class Request extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        type: "enum",
        enum: RequestStatus,
        default: RequestStatus.PENDING
    })
    status: RequestStatus;

    @Column()
    problemType: string;

    @Column()
    comment: string;

    @ManyToOne(type => Shop, shop => shop.requests,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    shop: Shop;

    @ManyToOne(type => Engineer, engineer => engineer.requests,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    engineer: Engineer;

}