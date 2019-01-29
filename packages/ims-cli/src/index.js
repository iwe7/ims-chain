#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const program = require("commander");
const tokens_1 = require("./tokens");
const packages = require("../package.json");
const ims_ipfs_server_1 = require("ims-ipfs-server");
let ImsCliModule = class ImsCliModule {
};
ImsCliModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: tokens_1.Commander,
                useFactory: () => {
                    program
                        .version(packages.version)
                        .description(packages.description)
                        .option("-v, --version", "查看版本号")
                        .option("-h, --help", "查看帮助手册")
                        .option("-c, --config", "设置系统信息");
                    return program;
                }
            },
            {
                provide: tokens_1.Commands,
                useFactory: async (injector) => {
                    let commander = await injector.get(tokens_1.Commander);
                    return commander
                        .command("build [project]")
                        .option("-d, --dev", "项目名称")
                        .option("-p, --prod", "项目名称")
                        .action(async (project, options) => {
                        console.log("build");
                        debugger;
                    });
                }
            },
            {
                provide: tokens_1.Commands,
                useFactory: async (injector) => {
                    let commander = await injector.get(tokens_1.Commander);
                    return commander
                        .command("start")
                        .option("-p, --project", "项目名称")
                        .action((...args) => {
                        console.log("start");
                        ims_common_1.bootstrapModule(ims_ipfs_server_1.ImsIpfsServerModule);
                    });
                }
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: (injector) => {
                    return async () => {
                        let commander = await injector.get(tokens_1.Commander);
                        await injector.get(tokens_1.Commands);
                        commander.parse(process.argv);
                    };
                }
            }
        ],
        imports: []
    })
], ImsCliModule);
exports.ImsCliModule = ImsCliModule;
ims_common_1.bootstrapModule(ImsCliModule);
