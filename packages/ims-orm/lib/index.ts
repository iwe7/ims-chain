import { createConnection, Connection, ConnectionOptions, ObjectType, EntitySchema, Repository } from "typeorm";
import { Module, InjectionToken, Injector, ENTRY } from 'ims-common';
export const ImsOrmConnection = InjectionToken.fromString<Connection>('ImsOrmConnection');
export const ImsOrmConnectionOptions = InjectionToken.fromString<ConnectionOptions[]>('ImsOrmConnectionOptions', 'ImsOrmConnectionOptions', true);
export interface ImsOrmGetRepository {
    <Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity>;
}
export const ImsOrmGetRepository = InjectionToken.fromString<ImsOrmGetRepository>('ImsOrmGetRepository');
import { ConstructorMetadata } from 'ims-decorator';
import { join } from 'path';
const root = process.cwd();

@Module({
    imports: [],
    providers: [{
        provide: ImsOrmConnectionOptions,
        useFactory: () => {
            return require(join(root, 'config/db.json'))
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
        provide: ENTRY,
        useFactory: async (injector: Injector) => {
            const connection = await injector.get<Connection>(ImsOrmConnection);
            return async (param: ConstructorMetadata) => {
                return connection.getRepository(param.metadataDef)
            }
        }
    }]
})
export class ImsOrmModule { }
