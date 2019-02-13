import network = require("network");

export function getGatewayIp() {
  return new Promise<any>((resolve, reject) => {
    network.get_gateway_ip((err, routerIp) => {
      if (err) return reject(err);
      resolve(routerIp);
    });
  });
}

export function getActiveInterface() {
  return new Promise<any>((resolve, reject) => {
    network.get_active_interface((err, activeIf) => {
      if (err) return reject(err);
      resolve(activeIf);
    });
  });
}

export function portUnmapping(client: any, intPort: number, extPort: number) {
  return new Promise<any>((resolve, reject) => {
    client.portUnmapping(
      {
        private: intPort,
        public: extPort
      },
      (err, info) => {
        client.close(); // should be closed immediately
        if (err) return client(err);
        resolve(info);
      }
    );
  });
}

export function portMapping(
  client: any,
  intPort: number,
  extPort: number,
  ttl: number
) {
  return new Promise<any>((resolve, reject) => {
    client.portMapping(
      {
        private: intPort,
        public: extPort,
        ttl
      },
      (err, info) => {
        if (err) return reject(err);
        resolve(info);
      }
    );
  });
}

export function externalIp(client: any) {
  return new Promise<string>((resolve, reject) => {
    client.externalIp((err, info) => {
      if (err) return reject(err);
      resolve(info);
    });
  });
}

export function getPublicIp() {
  return new Promise<string>((resolve, reject) => {
    network.get_public_ip((err, info) => {
      if (err) return reject(err);
      resolve(info);
    });
  });
}
