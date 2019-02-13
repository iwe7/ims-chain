function getFetch() {
  try {
    return fetch;
  } catch (e) {
    return require("node-fetch");
  }
}
const core: typeof fetch = getFetch();
export { core as fetch };
