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
import { EngineerRating } from "./EngineerRating"

@Entity()
export class Shop extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    ownerName: string;

    @Column()
    ownerPhoneNumber: string;

    @Column()
    email: string;

    @Column()
    hash: string

    @OneToMany(type => Request, request => request.shop,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    requests: Request[];

    @OneToMany(type => EngineerRating, rating => rating.shop,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    ratings: EngineerRating[];

    constructor(name, location, ownerName, ownerPhoneNumber, email, hash) {
        super();
        this.name = name;
        this.location = location;
        this.ownerName = ownerName;
        this.ownerPhoneNumber = ownerPhoneNumber;
        this.email = email;
        this.hash = hash;
    }

    @BeforeInsert()
    async beforeInsert() {
        this.hash = hashSync(this.hash, genSaltSync(10));
      }

    static createShop(shop: Shop) {
        return this.save(shop);
    }

}