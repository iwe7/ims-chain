export abstract class Connection {
  dial(ma: any, options: any) {}
  createListener(options, handler) {}
  filter(multiaddrs: any[]) {}
}
