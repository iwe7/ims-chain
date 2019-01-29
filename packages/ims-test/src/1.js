"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ipld = require("ipld");
const IpfsRepo = require("ipfs-repo");
const IpfsBlockService = require("ipfs-block-service");
const ipldGit = require("ipld-git");
const initIpld = (ipfsRepoPath, callback) => {
    const repo = new IpfsRepo(ipfsRepoPath);
    repo.init({}, (err) => {
        if (err) {
            return callback(err);
        }
        repo.open((err) => {
            if (err) {
                return callback(err);
            }
            const blockService = new IpfsBlockService(repo);
            const ipld = new Ipld({ blockService: blockService, formats: [ipldGit] });
            return callback(null, ipld);
        });
    });
};
let root = process.cwd();
const path = require("path");
initIpld(path.join(root, "ifpsrepo"), (err, ipld) => {
    debugger;
    ipld.get();
});
