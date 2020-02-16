import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn } from "typeorm";    
import { 
    hashSync,
    compareSync,
    genSaltSync } from "bcrypt";    
import { Request } from "./Request";
import { EngineerRating } from "./EngineerRating";

@Entity()
export class Engineer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column({
        nullable: true
    })
    rating: number;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    hash: string;

    @OneToMany(type => Request, request => request.engineer, 
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    requests: Request[];

    @OneToMany(type => EngineerRating, rating => rating.engineer,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ratings: EngineerRating[];

    constructor(name, phoneNumber, email, hash) {
        super();
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.hash = hash;
    }

    @BeforeInsert()
    async beforeInsert() {
        this.hash = hashSync(this.hash, genSaltSync(10));
      }

      static createEngineer(engineer: Engineer) {
        return this.save(engineer);
    }

}