#!/usr/bin/env node
import { Module, bootstrapModule, AppInitialization } from "ims-common";
import program = require("commander");
import { Commander, Commands } from "./tokens";
import { Injector } from "ims-core";
const packages = require("../package.json");
import { tsc } from "ims-tools";
import { join } from "path";
import commands from "./commands";
import { ImsCloudServer } from 'ims-cloud-server';

@Module({
  providers: [
    ...commands,
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
            const root = process.cwd();
            const result = await tsc(join(root, project));
            return result;
          });
      }
    },
    {
      provide: Commands,
      useFactory: async (injector: Injector) => {
        let commander = await injector.get(Commander);
        return commander
          .command("start")
          .action((port: number, host: string) => {
            bootstrapModule(ImsCloudServer, []).then();
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
