import { NatPMP } from "ims-nat";

async function bootstrap() {
  let pmp = new NatPMP();
  let port = ~~(Math.random() * 65536);
  let natmapping= await pmp.addMapping(8088, 80, 0);
  console.log(natmapping);
  debugger;
}

bootstrap();
