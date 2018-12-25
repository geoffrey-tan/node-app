import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Articles} from "./Articles";

@Entity()
export class Content {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Articles, articles => articles.content_id)
    @JoinColumn({ name: "article_id" })
    article_id: Articles;

    @Column()
    title: string;

    @Column()
    text: string;
}