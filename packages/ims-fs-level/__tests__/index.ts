import { ImsFsLevel } from "ims-fs-level";
import { join } from "path";
async function bootstrap() {
  const fs = new ImsFsLevel(join(__dirname, "data"));
//   fs.put("demo", "test");
  let res = await fs.get("demo").then(res => res.toString());
  debugger;
}
bootstrap();
