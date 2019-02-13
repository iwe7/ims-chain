import WebSocket = require("ws");
import { EventEmitter } from "events";
import { HttpServer, HttpModule } from "ims-http";
import { Injectable, Module, Inject } from "ims-common";

@Injectable()
export class WsServer extends EventEmitter {
  wsServer: WebSocket.Server;
  constructor(@Inject(HttpServer) public server: HttpServer) {
    super();
    this.wsServer = new WebSocket.Server({
      server,
      perMessageDeflate: false
    });
    this.wsServer.on("connection", (socket: WebSocket) => {
      this.emit("connection", socket);
    });
    this.proxy("listening");
    this.proxy("request");
    this.proxy("close");
  }

  on(event: "listening", listener: (...args: any[]) => void): this;
  on(event: "request", listener: (...args: any[]) => void): this;
  on(event: "close", listener: (...args: any[]) => void): this;
  on(event: "connection", listener: (socket: WebSocket) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }

  address() {
    return this.server.address.bind(this.server)();
  }

  listen(addr: any, onListening?: (...args: any[]) => any) {
    if (onListening) this.once("listening", onListening);
    this.server.listen(addr.port || addr);
    return this;
  }

  close(onClose?: Function) {
    this.server.close(onClose);
    this.wsServer.close();
    return this;
  }

  private proxy(event: string) {
    return this.server.on(event, (...args: any[]) => {
      this.emit(event, args);
    });
  }
}

@Module({
  imports: [HttpModule]
})
export class WsServerModule {}
