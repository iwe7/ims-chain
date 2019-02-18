import { createConnection, Connection, ConnectionOptions, ObjectType, EntitySchema, Repository } from "typeorm";
import { Module, InjectionToken, Injector, ENTERY } from 'ims-common';
export const ImsOrmConnection = InjectionToken.fromString<Connection>('ImsOrmConnection');
export const ImsOrmConnectionOptions = InjectionToken.fromString<ConnectionOptions[]>('ImsOrmConnectionOptions', 'ImsOrmConnectionOptions', true);
export interface ImsOrmGetRepository {
    <Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity>;
}
export const ImsOrmGetRepository = InjectionToken.fromString<ImsOrmGetRepository>('ImsOrmGetRepository');
import { ConstructorMetadata } from 'ims-decorator';

@Module({
    imports: [],
    providers: [{
        provide: ImsOrmConnectionOptions,
        useFactory: () => {
            return {
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "yang1989.",
                database: "meepo",
                entities: [],
                synchronize: true,
                logging: false
            } as ConnectionOptions;
        }
    }, {
        provide: ImsOrmConnection,
        useFactory: async (injector: Injector) => {
            const configs = await injector.get<ConnectionOptions[]>(ImsOrmConnectionOptions);
            let config: ConnectionOptions = {} as any;
            configs.forEach(cfg => {
                const entities = config.entities || [];
                config = {
                    ...config,
                    ...cfg,
                    entities: [
                        ...entities,
                        ...cfg.entities || []
                    ]
                } as any;
            })
            return await createConnection(config);
        }
    }, {
        provide: ENTERY,
        useFactory: async (injector: Injector) => {
            const connection = await injector.get<Connection>(ImsOrmConnection);
            return (param: ConstructorMetadata) => {
                return connection.getRepository(param.metadataDef)
            }
        }
    }]
})
export class ImsOrm { }
