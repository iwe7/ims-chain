export declare abstract class Path {
    abstract separator: string;
    abstract normalize(path: string): string;
    abstract join(...paths: string[]): string;
}
export declare abstract class KnownPath {
    readonly documents: string;
    readonly config: string;
    readonly home: string;
    readonly temp: string;
    readonly library: string;
    readonly developer: string;
    readonly desktop: string;
    readonly downloads: string;
    readonly movies: string;
    readonly music: string;
    readonly pictures: string;
    readonly share: string;
}
//# sourceMappingURL=path.d.ts.map