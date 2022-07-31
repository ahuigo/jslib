import "./imported.ts";

const handler = (e: Event): void => {
  console.log(`got ${e.type} event in event handler (main)`);
};

globalThis.addEventListener("load", handler);

globalThis.addEventListener("unload", handler);

globalThis.onload = (e: Event): void => {
  console.log(`got ${e.type} event in onload function (main)`);
};

globalThis.onunload = (e: Event): void => {
  console.log(`got ${e.type} event in onunload function (main)`);
};

console.log("log from main script");

/*

but onload and onunload defined in main.ts overrode handlers defined in imported.ts.

$ deno run main.ts
log from imported script
log from main script
got load event in event handler (imported)
got load event in onload function (main)
got load event in event handler (main)
got unload event in event handler (imported)
got unload event in onunload function (main)
got unload event in event handler (main)
*/