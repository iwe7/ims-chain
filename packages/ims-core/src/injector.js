"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_token_1 = require("./injection_token");
const provider_1 = require("./provider");
const querystring_1 = require("querystring");
let currentInjector;
function getCurrentInjector() {
    return currentInjector;
}
exports.getCurrentInjector = getCurrentInjector;
class Injector {
    constructor(providers = [], parent) {
        this.providers = providers;
        this.parent = parent;
        this.records = new Map();
        currentInjector = this;
    }
    static async create(providers = [], parent = Injector.top) {
        let injector = new Injector(providers, parent);
        await injector.init();
        return injector;
    }
    async init() {
        let token = injection_token_1.InjectionToken.fromType(Injector);
        this.set(token, {
            fn: () => new Promise((resolve, reject) => {
                resolve(this);
            }),
            value: this,
            useCache: true,
            token
        });
        for (let i = 0; i < this.providers.length; i++) {
            let provider = this.providers[i];
            await this.handlerStaticProvider(provider);
        }
    }
    async handlerFactory(provider) {
        let token = provider.provide;
        let multi = !!token.multi;
        if (multi) {
            let value = await this.get(token);
            if (!Array.isArray(value)) {
                value = [];
            }
            this.set(token, {
                fn: new Proxy(provider.useFactory, {
                    async apply(target, thisArg, argArray) {
                        let val = await Reflect.apply(target, thisArg, argArray);
                        return value.concat(val);
                    }
                }),
                useCache: false,
                value: undefined,
                token
            });
        }
        else {
            this.set(provider.provide, {
                fn: provider.useFactory,
                useCache: typeof provider.cache === "boolean" ? provider.cache : true,
                value: undefined,
                token
            });
        }
    }
    async handlerStaticProvider(provider) {
        if (provider_1.isStaticProviderFn(provider)) {
            provider = await provider(this);
            await this.handlerStaticProvider(provider);
        }
        else {
            if (provider_1.isFactoryProvider(provider)) {
                await this.handlerFactory(provider);
            }
        }
    }
    async getRecord(token) {
        let hash = await token.hash;
        return this.getRecordByHash(hash);
    }
    getRecordByHash(hash) {
        let record = this.records.get(hash);
        if (record)
            return record;
        if (this.parent) {
            return this.parent.getRecordByHash(hash);
        }
        return undefined;
    }
    async getByHash(hash, notFound) {
        let record = this.getRecordByHash(hash);
        if (record) {
            if (record.value && record.useCache) {
                return record.value;
            }
            else {
                record.value = await record.fn(this);
                this.records.set(hash, record);
                return record.value;
            }
        }
        if (record) {
            throw new Error(`not found ${querystring_1.stringify(record.token)}`);
        }
        return notFound;
    }
    async has(token) {
        token = injection_token_1.InjectionToken.fromType(token);
        let hash = await token.hash;
        let record = this.getRecordByHash(hash);
        return !!record;
    }
    async get(token, notFound) {
        token = injection_token_1.InjectionToken.fromType(token);
        let hash = await token.hash;
        return await this.getByHash(hash, notFound);
    }
    static get(token, notFound) {
        return currentInjector && currentInjector.get(token, notFound);
    }
    async set(token, factory) {
        let hash = await token.hash;
        this.records.set(hash, factory);
    }
}
Injector.top = new Injector([], null);
exports.Injector = Injector;
