import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Articles} from "./Articles";

@Entity()
export class Pinned {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @OneToOne(type => Articles, articles => articles.pinned_id)
    @JoinColumn( { name: "article_id" } )
    article_id: Articles;
    
}