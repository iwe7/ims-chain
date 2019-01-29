export interface ImsHtmlHeaderMeta {
  [key: string]: string;
}
export type ImsHtmlHeaderStyle = string;
export type ImsHtmlHeaderScript = string;

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

const opt: ImsHtml = {
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
        content:
          "width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"
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

export function addStyle(style: string) {
  opt.styles.push(style);
}
export function addScript(script: string) {
  opt.script.push(script);
}
export function addInlineStyle(style: string) {
  opt.inlineStyles.push(style);
}
export function addInlineScript(script: string) {
  opt.inlineScript.push(script);
}

function handlerHeaderMeta() {
  let str: string = opt.header.meta
    .map(
      res =>
        `<meta ${Object.keys(res)
          .map(key => `${key}="${res[key]}"`)
          .join(" ")}/>`
    )
    .join("\n");
  return str;
}
function handlerScript() {
  const scripts = opt.script;
  let str: string = scripts
    .map(res => `<script crossorigin="anonymous" src="${res}"></script>`)
    .join("\n");
  return str;
}
function handlerStyle() {
  let str: string = opt.styles
    .map(res => `<link rel="stylesheet" href="${res}">`)
    .join("\n");
  return str;
}
export function htmlToString() {
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
