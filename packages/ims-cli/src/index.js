"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const program = require("commander");
const tokens_1 = require("./tokens");
let root = process.cwd();
const path = require("path");
const fs = require("fs");
const packages = require("../package.json");
const ims_ipfs_1 = require("ims-ipfs");
const src_1 = require("packages/ims-ipfs-client/src");
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
                        let node = await injector.get(ims_ipfs_1.IpfsApi);
                        let ROOT = path.join(root, project);
                        let json = require(path.join(ROOT, "app.json"));
                        let files = fs.readdirSync(ROOT);
                        files.map(file => { });
                        console.log(files);
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
                        console.log(args);
                    });
                }
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: (injector) => {
                    return async () => {
                        let commander = await injector.get(tokens_1.Commander);
                        let commands = await injector.get(tokens_1.Commands);
                        commander.parse(process.argv);
                    };
                }
            }
        ],
        imports: [src_1.ImsIpfsClientModule]
    })
], ImsCliModule);
exports.ImsCliModule = ImsCliModule;
ims_common_1.bootstrapModule(ImsCliModule);
