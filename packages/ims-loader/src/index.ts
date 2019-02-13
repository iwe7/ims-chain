import { Injectable } from "ims-common";

@Injectable()
export class Loader {
  constructor() {}
  async loadHash(hash: string): Promise<any> {}
}
