import { Tcp } from "./index";
import { fromEvent } from "rxjs";
const tcp = new Tcp();

fromEvent(tcp, "listening").subscribe(res => {
  console.log(res);
});
debugger;
