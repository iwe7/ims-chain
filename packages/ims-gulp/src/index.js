"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_ipfs_1 = require("ims-ipfs");
const ims_common_1 = require("ims-common");
const through = require("through2");
const path = require("path");
const ims_ipfs_client_1 = require("ims-ipfs-client");
const token_1 = require("./token");
const gulp = require("gulp");
let files = [];
async function handlerTask(injector) {
    return through.obj(async (chunk, enc, cb) => {
        if (chunk && chunk.contents) {
            files.push({
                path: chunk.relative,
                content: chunk.contents.toString(enc)
            });
        }
        cb();
    });
}
let ImsGulpModule = class ImsGulpModule {
};
ImsGulpModule = tslib_1.__decorate([
    ims_common_1.Module({
        providers: [
            {
                provide: token_1.GulpToken,
                useFactory: () => {
                    return gulp.src(path.join(__dirname, "../**/*"));
                }
            },
            {
                provide: ims_common_1.AppInitialization,
                useFactory: (injector) => {
                    return (injector) => {
                        return new Promise(async (resolve, reject) => {
                            let res = await handlerTask(injector);
                            let _gulp = await injector.get(token_1.GulpToken);
                            let ipfs = await injector.get(ims_ipfs_1.IpfsApi);
                            let stream = _gulp
                                .pipe(res)
                                .pipe(gulp.dest(path.join(process.cwd(), "dist")));
                            stream.on("end", async () => {
                                let result = await ipfs.add(files);
                                console.log(result);
                                resolve();
                            });
                        });
                    };
                }
            }
        ],
        imports: [ims_ipfs_client_1.ImsIpfsClientModule]
    })
], ImsGulpModule);
exports.ImsGulpModule = ImsGulpModule;
ims_common_1.bootstrapModule(ImsGulpModule).then(res => { });
