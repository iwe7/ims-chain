import { NatManager } from "ims-nat";
async function bootstrap() {
  const manager = new NatManager();
  let mapping = await manager.addMapping(80, 80, 60000);
  debugger;
}
bootstrap();
