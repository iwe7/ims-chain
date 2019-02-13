import { Module } from "ims-common";
const utp = require("utp-native");
@Module()
export class UtpModule {
  constructor() {
    const server = utp.createServer(function(socket) {
      socket.pipe(socket); // echo server
    });

    server.listen(10000, function() {
      const socket = utp.connect(10000);
      socket.write("hello world");
      socket.end();
      socket.on("data", function(data) {
        console.log("echo: " + data);
      });
      socket.on("end", function() {
        console.log("echo: (ended)");
      });
    });
  }
}

let _utp = new UtpModule();
