export abstract class ImsApp {
    abstract switchTab(): Promise<any>;
    abstract reLaunch(): Promise<any>;
    abstract redirectTo(): Promise<any>;
    abstract navigateTo(): Promise<any>;
    abstract navigateBack(): Promise<any>;
}
