import { Module } from "ims-common";
import { ImsOrmModule, ImsOrmConnectionOptions } from "ims-orm";
import { ImsModules, ImsModulesBindings, ImsModulesIgnore, ImsModulesCloud, ImsModulesPlugin, ImsModulesRank, ImsModulesRecycle } from './mdoules/index'
@Module({
    providers: [
        {
            provide: ImsOrmConnectionOptions,
            useFactory: () => {
                return {
                    entities: [
                        ImsModules,
                        ImsModulesBindings,
                        ImsModulesIgnore,
                        ImsModulesCloud,
                        ImsModulesPlugin,
                        ImsModulesRank,
                        ImsModulesRecycle
                    ]
                }
            }
        }
    ],
    imports: [
        ImsOrmModule
    ]
})
export class ImsAddonsModule { }

export * from './mdoules/index';
