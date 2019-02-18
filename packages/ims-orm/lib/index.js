"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ims_common_1 = require("ims-common");
exports.ImsOrmConnection = ims_common_1.InjectionToken.fromString('ImsOrmConnection');
exports.ImsOrmConnectionOptions = ims_common_1.InjectionToken.fromString('ImsOrmConnectionOptions', 'ImsOrmConnectionOptions', true);
exports.ImsOrmGetRepository = ims_common_1.InjectionToken.fromString('ImsOrmGetRepository');
let ImsOrm = class ImsOrm {
};
ImsOrm = tslib_1.__decorate([
    ims_common_1.Module({
        imports: [],
        providers: [{
                provide: exports.ImsOrmConnectionOptions,
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
                    };
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
                provide: ims_common_1.ENTERY,
                useFactory: async (injector) => {
                    const connection = await injector.get(exports.ImsOrmConnection);
                    return (param) => {
                        return connection.getRepository(param.metadataDef);
                    };
                }
            }]
    })
], ImsOrm);
exports.ImsOrm = ImsOrm;
