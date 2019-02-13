var nat = require("nat-traverse");

nat(
  {
    type: "udp", // tcp or udp - passed to nat-pmp
    private: 22,
    public: 8888,
    ttl: 3600,
    timeout: 3000
  },
  function(external) {
    let ip = external.ip.toString();
    let msg = external.msg.toString();
    console.log("Connected to WAN address: ", external);
    debugger;
  },
  function(err) {
    console.log(err);
  }
);
