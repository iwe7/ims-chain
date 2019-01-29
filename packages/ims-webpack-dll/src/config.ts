import path = require("path");
export const config = {
  name: "dll",
  context: "dll",
  manifest: path.join(__dirname, "dll", "manifest.json")
}
