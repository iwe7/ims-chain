var nat = require("nat-traverse");
nat({
    type: "udp",
    private: 8088,
    public: 80,
    ttl: 3600,
    timeout: 3000
}, function (external) {
    console.log("Connected to WAN address: " + external);
}, function (err) {
    console.log(err);
});
