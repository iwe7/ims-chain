import { Module, AppInitialization } from "ims-common";

@Module({
  providers: [
    {
      provide: AppInitialization,
      useFactory: () => {},
      deps: []
    }
  ],
  imports: []
})
export class ImsFsModule {}
