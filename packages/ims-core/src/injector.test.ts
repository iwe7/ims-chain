import { Injector } from "./injector";
import { InjectionToken } from "./injection_token";
let token = new InjectionToken("demo", "demo");

let injector = new Injector(
  [
    {
      provide: token,
      useFactory: () => {
        return {
          demo: "title"
        };
      },
      deps: []
    }
  ],
  null
);

async function bootstrap() {
  let ref = await injector.get(token);
  debugger;
}
bootstrap();
