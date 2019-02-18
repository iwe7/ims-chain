import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({
    name: 'ims_modules_bindings'
})
export class ImsModulesBindings {
    @PrimaryColumn({
        generated: true,
        type: 'int'
    })
    eid: number;

    @Column({
        length: 100
    })
    module: string;

    @Column({
        length: 30
    })
    entry: string;

    @Column({
        length: 50
    })
    call: string;

    @Column({
        length: 50
    })
    title: string;

    @Column({
        length: 200
    })
    do: string;

    @Column({
        length: 200
    })
    state: string;

    @Column()
    direct: boolean;

    @Column({
        length: 255
    })
    url: string;

    @Column({
        length: 255
    })
    icon: string;

    @Column()
    displayorder: number;
}
