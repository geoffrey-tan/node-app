import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Pinned {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    article_id: number;
    
}