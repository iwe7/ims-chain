import { Module, bootstrapModule, AppInitialization } from "ims-common";
import program = require("commander");
import { Commander, Commands } from "./tokens";
import { Injector } from "ims-core";
let root = process.cwd();
import path = require("path");
import fs = require("fs");

const packages = require("../package.json");
import { IpfsApi } from "ims-ipfs";
import { ImsIpfsClientModule } from "packages/ims-ipfs-client/src";

@Module({
  providers: [
    {
      provide: Commander,
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
      provide: Commands,
      useFactory: async (injector: Injector) => {
        let commander = await injector.get(Commander);
        return commander
          .command("build [project]")
          .option("-d, --dev", "项目名称")
          .option("-p, --prod", "项目名称")
          .action(async (project: string, options: any[]) => {
            let node = await injector.get(IpfsApi);
            let ROOT = path.join(root, project);
            let json = require(path.join(ROOT, "app.json"));
            let files = fs.readdirSync(ROOT);
            files.map(file => {});
            console.log(files);
            debugger;
          });
      }
    },
    {
      provide: Commands,
      useFactory: async (injector: Injector) => {
        let commander = await injector.get(Commander);
        return commander
          .command("start")
          .option("-p, --project", "项目名称")
          .action((...args: any[]) => {
            console.log(args);
          });
      }
    },
    {
      provide: AppInitialization,
      useFactory: (injector: Injector) => {
        return async () => {
          let commander = await injector.get(Commander);
          let commands = await injector.get(Commands);
          commander.parse(process.argv);
        };
      }
    }
  ],
  imports: [ImsIpfsClientModule]
})
export class ImsCliModule {}

bootstrapModule(ImsCliModule);
