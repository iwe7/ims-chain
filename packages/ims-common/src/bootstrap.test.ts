import { Module } from "./module";
import { bootstrapModule } from "./bootstrap";
import { Injectable } from "./injectable";
import { InjectionToken } from "ims-core";
import { Inject } from "./inject";

@Injectable()
export class InjectableTest2 {}

@Injectable()
export class InjectableTest3 {}

@Injectable()
export class InjectableTest {
  @Inject(InjectableTest2)
  test3: InjectableTest2;

  constructor(@Inject(InjectableTest3) public test2: InjectableTest2) {}

  add(
    @Inject(InjectableTest2)
    test2: InjectableTest2
  ) {}
}

@Module({
  providers: []
})
export class Test2Module {}

bootstrapModule(Test2Module).then(async res => {
  let token = InjectionToken.fromType(InjectableTest);
  let hash = await token.hash;
  let test = await res.injector.get(token);
  console.log(test);
  debugger;
});
