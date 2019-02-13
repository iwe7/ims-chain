import { ImsWebappModuleLinkUniacid } from "./module-link-uniacid";
import { ImsWebappBindDomain } from "./bind-domain";
import { ImsWebappManage } from "./manage";
export declare abstract class ImsWebapp {
    readonly bindDomain: ImsWebappBindDomain;
    readonly manage: ImsWebappManage;
    readonly moduleLinkUniacid: ImsWebappModuleLinkUniacid;
    abstract rewrite(): Promise<any>;
    abstract home(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map