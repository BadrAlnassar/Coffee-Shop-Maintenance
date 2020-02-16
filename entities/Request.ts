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

export enum ProblemType {
    X1 = "x1",
    X2 = "x2",
    X3 = "x3"
}

@Entity()
export class Request extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: string;

    @Column({
        type: "enum",
        enum: RequestStatus,
        default: RequestStatus.PENDING
    })
    status: RequestStatus;

    @Column({
        type: "enum",
        enum: ProblemType
    })
    problemType: ProblemType;


    @Column()
    comment: string;

    @ManyToOne(type => Shop, shop => shop.requests,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    shop: Shop;

    @ManyToOne(type => Engineer, engineer => engineer.requests,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    engineer: Engineer;

    constructor(problemType, comment, shopId, engineerId) {
        super();
        this.problemType = problemType;
        this.comment = comment;
        let shop = new Shop(undefined, undefined, undefined, undefined, undefined, undefined);
        shop.id = shopId;
        this.shop = shop;
        let engineer = new Engineer(undefined, undefined, undefined, undefined);
        engineer.id = engineerId;
        this.engineer = engineer;
    }

    static async getRequest(id: number) {
        return this.findOne({
            where: { id }
        });
    }
    
}