"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_common_1 = require("ims-common");
const token_1 = require("./token");
const IpfsRepo = require("ipfs-repo");
let ImsRepoModule = class ImsRepoModule {
};
ImsRepoModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: token_1.ImsReposOptions,
                useFactory: () => {
                    return {
                        path: "./ip01"
                    };
                }
            },
            {
                provide: token_1.ImsRepos,
                useFactory: async (injector) => {
                    let options = await injector.get(token_1.ImsReposOptions);
                    let repos = {};
                    const onReady = (repo) => {
                        return new Promise(async (resolve, reject) => {
                            repo.init({}, (err) => {
                                if (err)
                                    return reject(err);
                                repo.open((err) => {
                                    if (err)
                                        return reject(err);
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
], ImsRepoModule);
exports.ImsRepoModule = ImsRepoModule;
//# sourceMappingURL=index.js.map