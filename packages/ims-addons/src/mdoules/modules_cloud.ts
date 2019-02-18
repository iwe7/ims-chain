import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity({
    name: 'ims_modules_cloud'
})
export class ImsModulesCloud {

    @PrimaryColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 100
    })
    title: string;

    @Column()
    title_initial: boolean;

    @Column({
        length: 100
    })
    logo: string;

    @Column({
        length: 10
    })
    version: string;

    @Column({
        length: 4,
        type: 'tinyint'
    })
    install_status: number;

    @Column()
    account_support: boolean;

    @Column()
    wxapp_support: boolean;

    @Column()
    webapp_support: boolean;

    @Column()
    phoneapp_support: boolean;

    @Column()
    welcome_support: boolean;

    @Column()
    xzapp_support: boolean;

    @Column()
    aliapp_support: boolean;


    @Column({
        length: 11
    })
    cloud_id: number;

    @Column({
        length: 50,
    })
    main_module_name: string;

    @Column({
        length: 100,
    })
    main_module_logo: string;

    @Column()
    has_new_version: boolean;

    @Column()
    has_new_branch: boolean;

    @Column()
    is_ban: boolean;

    @Column({
        length: 11
    })
    lastupdatetime: number;
}
