import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Articles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;
    
}