"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function scriptLoader(url, firstParentUrl) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.charset = "utf-8";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.addEventListener("error", () => {
            reject(new Error("Error loading " +
                url +
                (firstParentUrl ? " from " + firstParentUrl : "")));
        });
        script.addEventListener("load", err => {
            document.head.removeChild(script);
            if (err)
                return reject(err);
            else
                resolve(loader.getRegister());
        });
        script.src = url;
        document.head.appendChild(script);
    });
}
exports.scriptLoader = scriptLoader;
