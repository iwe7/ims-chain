import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({
    name: 'ims_modules'
})
export class ImsModules {
    @PrimaryColumn({
        generated: true,
        type: 'int'
    })
    mid: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 20
    })
    type: string;

    @Column({
        length: 100
    })
    title: string;

    @Column({
        length: 15
    })
    version: string;

    @Column({
        length: 500
    })
    ability: string;

    @Column({
        length: 1000
    })
    description: string;

    @Column({
        length: 50
    })
    author: string;

    @Column({
        length: 255
    })
    url: string;

    @Column()
    settings: boolean;

    @Column({
        length: 500
    })
    subscribes: string;

    @Column({
        length: 500
    })
    handles: string;

    @Column({
        length: 10,
    })
    target: string;

    @Column({
        type: 'text'
    })
    permissions: string;

    @Column()
    isrulefields: boolean;

    @Column()
    issystem: boolean;

    @Column()
    iscard: boolean;

    @Column()
    title_initial: boolean;

    @Column()
    wxapp_support: boolean;

    @Column()
    welcome_support: boolean;

    @Column()
    oauth_type: boolean;

    @Column()
    webapp_support: boolean;

    @Column()
    phoneapp_support: boolean;

    @Column()
    xzapp_support: boolean;

    @Column()
    aliapp_support: boolean;
}
