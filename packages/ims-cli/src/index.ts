#!/usr/bin/env node
import { Module, bootstrapModule, AppInitialization } from "ims-common";
import program = require("commander");
import { Commander, Commands } from "./tokens";
import { Injector } from "ims-core";
const packages = require("../package.json");
import { ImsIpfsServerModule } from "ims-ipfs-server";
import { Config } from "ims-cloud";

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
            console.log("build");
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
          .option("-p, --port", "端口号")
          .option("-h, --host", "地址")
          .action((port: number, host: string) => {
            bootstrapModule(ImsIpfsServerModule, [
              {
                provide: Config,
                useFactory: () => {
                  return {
                    host: host || "0.0.0.0",
                    port: port || 80
                  };
                }
              }
            ]).then(async res => {
              let config = await res.injector.get(Config);
              console.log(config);
            });
          });
      }
    },
    {
      provide: AppInitialization,
      useFactory: (injector: Injector) => {
        return async () => {
          let commander = await injector.get(Commander);
          await injector.get(Commands);
          commander.parse(process.argv);
        };
      }
    }
  ],
  imports: []
})
export class ImsCliModule {}

bootstrapModule(ImsCliModule);
