import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn} from "typeorm";
import {Content} from "./Content";
import {Pinned} from "./Pinned";

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

    @OneToOne(type => Pinned, pinned => pinned.article_id)
    pinned_id: Pinned;
    
}