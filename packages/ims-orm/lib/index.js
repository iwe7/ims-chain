"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ims_common_1 = require("ims-common");
exports.ImsOrmConnection = ims_common_1.InjectionToken.fromString('ImsOrmConnection');
exports.ImsOrmConnectionOptions = ims_common_1.InjectionToken.fromString('ImsOrmConnectionOptions', 'ImsOrmConnectionOptions', true);
exports.ImsOrmGetRepository = ims_common_1.InjectionToken.fromString('ImsOrmGetRepository');
const path_1 = require("path");
const root = process.cwd();
let ImsOrmModule = class ImsOrmModule {
};
ImsOrmModule = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [],
        providers: [{
                provide: exports.ImsOrmConnectionOptions,
                useFactory: () => {
                    return require(path_1.join(root, 'config/db.json'));
                }
            }, {
                provide: exports.ImsOrmConnection,
                useFactory: async (injector) => {
                    const configs = await injector.get(exports.ImsOrmConnectionOptions);
                    let config = {};
                    configs.forEach(cfg => {
                        const entities = config.entities || [];
                        config = {
                            ...config,
                            ...cfg,
                            entities: [
                                ...entities,
                                ...cfg.entities || []
                            ]
                        };
                    });
                    return await typeorm_1.createConnection(config);
                }
            }, {
                provide: ims_common_1.ENTRY,
                useFactory: async (injector) => {
                    const connection = await injector.get(exports.ImsOrmConnection);
                    return async (param) => {
                        return connection.getRepository(param.metadataDef);
                    };
                }
            }]
    })
], ImsOrmModule);
exports.ImsOrmModule = ImsOrmModule;
