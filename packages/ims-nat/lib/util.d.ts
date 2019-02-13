export declare function getGatewayIp(): Promise<any>;
export declare function getActiveInterface(): Promise<any>;
export declare function portUnmapping(client: any, intPort: number, extPort: number): Promise<any>;
export declare function portMapping(client: any, intPort: number, extPort: number, ttl: number): Promise<any>;
export declare function externalIp(client: any): Promise<string>;
export declare function getPublicIp(): Promise<string>;
//# sourceMappingURL=util.d.ts.map