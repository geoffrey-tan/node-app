import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Content {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    article_id: number;

    @Column()
    title: string;

    @Column()
    text: string;
    
}