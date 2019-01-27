import { Module } from "ims-common";
import { Injector } from "ims-core";
import { ImsRepos, ImsReposOptions, ImsRepo } from "./token";

const IpfsRepo = require("ipfs-repo");
@Module({
  providers: [
    {
      provide: ImsReposOptions,
      useFactory: () => {
        return {
          path: "./ip01"
        } as ImsReposOptions;
      }
    },
    {
      provide: ImsRepos,
      useFactory: async (injector: Injector) => {
        let options = await injector.get(ImsReposOptions);
        let repos: any = {};
        const onReady = (repo: ImsRepo) => {
          return new Promise(async (resolve, reject) => {
            repo.init({}, (err: Error) => {
              if (err) return reject(err);
              repo.open((err: Error) => {
                if (err) return reject(err);
                resolve(repo);
              });
            });
          });
        };
        for (let option of options) {
          const { path, ...opt } = option;
          const repo = new IpfsRepo(path, opt);
          await onReady(repo);
          repos[path] = repo;
        }
        return repos;
      }
    }
  ],
  imports: []
})
export class ImsRepoModule {}
