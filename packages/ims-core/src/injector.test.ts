import { Injector } from "./injector";
import { InjectionToken } from "./injection_token";
let token = new InjectionToken("demo", "demo");

async function bootstrap() {
  let injector = await Injector.create([
    {
      provide: token,
      useFactory: async () => {
        return {
          demo: "title"
        };
      },
      deps: []
    }
  ]);
  let ref = await injector.get(token);
  debugger;
}
bootstrap();
