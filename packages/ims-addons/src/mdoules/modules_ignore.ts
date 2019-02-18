import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({
    name: 'ims_modules_ignore'
})
export class ImsModulesIgnore {

    @PrimaryColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 15
    })
    version: string;
}
