"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let opt = {
    header: {
        title: "demo",
        meta: [
            {
                charset: "UTF-8"
            },
            {
                "http-equiv": "Content-Type",
                content: "text/html; charset=utf-8"
            },
            {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge,chrome=1"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"
            },
            {
                name: "format-detection",
                content: "telephone=no"
            },
            {
                name: "apple-mobile-web-app-capable",
                content: "yes"
            },
            {
                name: "apple-mobile-web-app-status-bar-style",
                content: "black-translucent"
            },
            {
                name: "renderer",
                content: "webkit"
            },
            {
                name: "renderer",
                content: "ie-comp"
            },
            {
                name: "renderer",
                content: "ie-stand"
            },
            {
                "http-equiv": "Cache-Contro",
                content: "no-siteapp"
            }
        ]
    },
    styles: [],
    inlineStyles: [],
    script: [],
    inlineScript: []
};
const oldOpt = opt;
function initOpt() {
    opt = oldOpt;
}
exports.initOpt = initOpt;
function addStyle(style) {
    if (!opt.styles.includes(style))
        opt.styles.push(style);
}
exports.addStyle = addStyle;
function addScript(script) {
    if (!opt.script.includes(script))
        opt.script.push(script);
}
exports.addScript = addScript;
function addInlineStyle(style) {
    if (!opt.inlineStyles.includes(style))
        opt.inlineStyles.push(style);
}
exports.addInlineStyle = addInlineStyle;
function addInlineScript(script) {
    if (!opt.inlineScript.includes(script))
        opt.inlineScript.push(script);
}
exports.addInlineScript = addInlineScript;
function handlerHeaderMeta() {
    let str = opt.header.meta
        .map(res => `<meta ${Object.keys(res)
        .map(key => `${key}="${res[key]}"`)
        .join(" ")}/>`)
        .join("\n");
    return str;
}
function handlerScript() {
    const scripts = opt.script;
    let str = scripts
        .map(res => `<script crossorigin="anonymous" src="${res}"></script>`)
        .join("\n");
    return str;
}
function handlerStyle() {
    let str = opt.styles
        .map(res => `<link rel="stylesheet" href="${res}">`)
        .join("\n");
    return str;
}
function htmlToString() {
    console.log(opt);
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${opt.header.title}</title>
    ${handlerHeaderMeta()}
    ${handlerStyle()}
    ${opt.inlineStyles.map(style => `<style>${style}</style>`).join("\n")}
</head>
<body>
    <div id="app"></div>
    ${handlerScript()}
    ${opt.inlineScript.map(script => `<script>${script}</script>`).join("\n")}
</body>
</html>
    `;
}
exports.htmlToString = htmlToString;
