import { NatUpnp } from "ims-nat";

async function bootstrap() {
  let upnp = new NatUpnp();
  let natmapping = await upnp.addMapping(8088, 80, 0);
  console.log(natmapping);
  debugger;
}

bootstrap();
