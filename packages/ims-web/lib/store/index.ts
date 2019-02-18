export abstract class ImsStore {
    abstract list(): Promise<any>;
    abstract publish(): Promise<any>;
}
