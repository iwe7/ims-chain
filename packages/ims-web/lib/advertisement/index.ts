export abstract class ImsAdvertisementContentProvider {
  abstract flow_control(): Promise<any>;
  abstract finance_info(): Promise<any>;
  abstract register_flow(): Promise<any>;
  abstract display(): Promise<any>;
  abstract account_list(): Promise<any>;
  abstract ad_type_get(): Promise<any>;
  abstract content_provider(): Promise<any>;
}

export abstract class ImsAdvertisement {
  readonly contentProvider: ImsAdvertisementContentProvider;
}
