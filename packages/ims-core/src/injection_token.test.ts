import { InjectionToken } from "./injection_token";
let token = new InjectionToken("demo", "demo");
import { equal } from "assert";
token.hash.then(res => {
  equal(
    res,
    "QmQ81NyMcYYp4j8Y1nNYsjpj8ZrLZS3kHCFKk8DgoNWkUZ",
    "InjectionTOken.hash"
  );
  console.log(res);
});
