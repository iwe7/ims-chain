import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity()
export class ImsDemo {
    @PrimaryColumn()
    uid: number;

    @Column()
    username: string;
}
