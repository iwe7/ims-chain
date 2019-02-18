import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({
    name: 'ims_modules_recycle'
})
export class ImsModulesRecycle {

    @PrimaryColumn()
    id: number;

    @Column({
        length: 255
    })
    name: string;

    @Column({
        type: 'tinyint'
    })
    type: number;
}
