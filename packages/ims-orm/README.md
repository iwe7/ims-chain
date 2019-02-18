# `ims-orm`

> typeorm封装

```ts
import {ImsOrmModule} from 'ims-orm'
import {Module,bootstrapModule,Injectable,Entry} from 'ims-common'
import {Entity,Repository} from 'typeorm';

@Entity()
export class ImsUser{}

@Injectable()
export class ImsController{
    constructor(@Entry(ImsUser) public user: Repository<ImsUser>){}
    saveUser(){
        const user = new ImsUser();
        this.user.save(user)
    }
}

@Module({
    imports:[ImsOrmModule],
    providers: [{
        provide:ImsOrmConnectionOptions,
        useFactory: ()=>{
            return {
                entities: [
                    ImsUser
                ]
            }
        }
    }]
})
export class ImsDemoModule{}
bootstrapModule(ImsDemoModule).then(async res=>{
    const ctrl = await res.injector.get(ImsController)
    ctrl.saveUser();
})
```
