export declare abstract class ImsArticle {
    readonly newsShow: ImsArticleNewsShow;
    readonly news: ImsArticleNews;
    readonly noticeShow: ImsArticleNoticeShow;
    readonly notice: ImsArticleNotice;
}
export declare abstract class ImsArticleNotice {
    abstract category_post(): Promise<any>;
    abstract category(): Promise<any>;
    abstract category_del(): Promise<any>;
    abstract list(): Promise<any>;
    abstract post(): Promise<any>;
    abstract batch_post(): Promise<any>;
    abstract del(): Promise<any>;
    abstract displaysetting(): Promise<any>;
    abstract comment_status(): Promise<any>;
    abstract comments(): Promise<any>;
    abstract reply_comment(): Promise<any>;
}
export declare abstract class ImsArticleNewsShow {
    abstract list(): Promise<any>;
    abstract detail(): Promise<any>;
}
export declare abstract class ImsArticleNews {
    abstract category_post(): Promise<any>;
    abstract category(): Promise<any>;
    abstract category_del(): Promise<any>;
    abstract list(): Promise<any>;
    abstract post(): Promise<any>;
    abstract batch_post(): Promise<any>;
    abstract del(): Promise<any>;
    abstract displaysetting(): Promise<any>;
}
export declare abstract class ImsArticleNoticeShow {
    abstract detail(): Promise<any>;
    abstract list(): Promise<any>;
    abstract like_comment(): Promise<any>;
    abstract more_comments(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map