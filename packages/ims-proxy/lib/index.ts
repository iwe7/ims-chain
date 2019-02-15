import { NatManager } from "ims-nat";
import { close } from "ims-close-port";
export async function bootstrap() {
  await close(80);
  await close(443);
  const manager = new NatManager();
  await manager.deleteMapping(80);
  await manager.deleteMapping(443);
  await manager.addMapping(80, 80, 0);
  await manager.addMapping(443, 443, 0);
}
