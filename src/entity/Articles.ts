import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import {Content} from "./Content";

@Entity()
export class Articles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @OneToMany(type => Content, content => content.article_id)
    @JoinColumn({ name: "content_id" })
    content_id: Content[];
    
}