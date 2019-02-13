export abstract class ImsFounder {
  readonly display: ImsFounderDisplay;
  abstract create(): Promise<any>;
}

export abstract class ImsFounderDisplay {
  abstract display(): Promise<any>;
  abstract del(): Promise<any>;
}

export abstract class ImsFounderEdit {
  abstract edit_base(): Promise<any>;
  abstract edit_modules_tpl(): Promise<any>;
  abstract edit_account(): Promise<any>;
}

export abstract class ImsFounderGroup {
  abstract display(): Promise<any>;
  abstract post(): Promise<any>;
  abstract del(): Promise<any>;
}
