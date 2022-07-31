const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (imported)`);
};

globalThis.addEventListener("load", handler);
globalThis.addEventListener("unload", handler);

globalThis.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (imported)`);
};

globalThis.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (imported)`);
};

console.log("log from imported script");
