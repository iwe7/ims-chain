export interface ImsHtmlHeaderMeta {
    [key: string]: string;
}
export declare type ImsHtmlHeaderStyle = string;
export declare type ImsHtmlHeaderScript = string;
export interface ImsHtmlHeader {
    title: string;
    meta: ImsHtmlHeaderMeta[];
}
export interface ImsHtml {
    header: ImsHtmlHeader;
    styles: ImsHtmlHeaderStyle[];
    inlineStyles: ImsHtmlHeaderStyle[];
    script: ImsHtmlHeaderScript[];
    inlineScript: ImsHtmlHeaderScript[];
}
export declare function initOpt(): void;
export declare function addStyle(style: string): void;
export declare function addScript(script: string): void;
export declare function addInlineStyle(style: string): void;
export declare function addInlineScript(script: string): void;
export declare function htmlToString(): string;
//# sourceMappingURL=html.d.ts.map