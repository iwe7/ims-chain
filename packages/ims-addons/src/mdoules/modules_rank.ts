import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({
    name: 'ims_modules_rank'
})
export class ImsModulesRank {

    @PrimaryColumn()
    id: number;

    @Column({
        length: 100
    })
    module_name: string;

    @Column()
    uid: number;

    @Column()
    rank: number;
}
