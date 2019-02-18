import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({
    name: 'ims_modules_plugin'
})
export class ImsModulesPlugin {

    @PrimaryColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 100
    })
    main_module: string;
}
