const Ipld = require("ipld");
const IpfsRepo = require("ipfs-repo");
const IpfsBlockService = require("ipfs-block-service");
const ipldGit = require("ipld-git");
const initIpld = (ipfsRepoPath: any, callback: any) => {
  const repo = new IpfsRepo(ipfsRepoPath);
  repo.init({}, (err: Error) => {
    if (err) {
      return callback(err);
    }
    repo.open((err: Error) => {
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
import path = require("path");
initIpld(path.join(root, "ifpsrepo"), (err: Error, ipld: any) => {
  // Do something with the `ipld`, e.g. `ipld.get(…)`
  debugger;
  ipld.get();
});
