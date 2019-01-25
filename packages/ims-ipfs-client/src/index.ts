import { ImsCloudClientModule } from "ims-cloud-client";
import { Module } from "ims-common";
import { Routes, Fetch, Config } from "ims-cloud";
import { IpfsApi } from "ims-ipfs";

@Module({
  providers: [
    {
      provide: Routes,
      useFactory: () => IpfsApi
    },
    {
      provide: Config,
      useFactory: () => {
        return {
          host: "localhost",
          port: 4802
        };
      }
    },
    {
      provide: Fetch,
      useFactory: () => require("node-fetch")
    }
  ],
  imports: [ImsCloudClientModule]
})
export class ImsIpfsClientModule {}
