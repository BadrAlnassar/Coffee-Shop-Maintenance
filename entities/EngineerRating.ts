import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn } from "typeorm";
import { Shop } from "./Shop";
import { Engineer } from "./Engineer";

@Entity()
export class EngineerRating extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: string;

    @Column()
    rating: number;

    @ManyToOne(type => Shop, shop => shop.requests,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    shop: Shop;

    @ManyToOne(type => Engineer, engineer => engineer.requests,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    engineer: Engineer;

}