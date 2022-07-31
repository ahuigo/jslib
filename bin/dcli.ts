#!/usr/bin/env deno run -A
import { writeAll } from "https://deno.land/std@0.147.0/streams/conversion.ts";

function perror(msg: string, status = 1) {
  console.log(msg);
  if (status) {
    Deno.exit(status);
  }
}

async function writeFile(filename: string, txt: string) {
  console.log(`write ${filename} ...`);
  const file = (await Deno.open(filename, { createNew: true, write: true }).catch(e => {
    const msg = `${e} ${filename}`;
    if (msg.includes('AlreadyExists')) {
      perror(msg, 0);
    } else {
      throw e;
    }
  }));

  if (file) {
    const content = new TextEncoder().encode(txt);
    await writeAll(file, content).catch(e => {
      console.log(e);
      throw e;
    });
    Deno.close(file.rid);
  }
}

//1. create deno.json + import_map.json
// trex
await (async () => {
  const conf = `
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "dom.asynciterable",
      "dom.extras",
      "deno.ns"
    ],
    "types": [
      "./types.d.ts"
    ],
    "jsx": "react-jsx",
    "jsxImportSource": "https://esm.sh/react@18.2.0"
  },
  "importMap": "./import_map.json",
  "fmt": {
    "options": { "lineWidth": 120 },
    "files": {
      "exclude": [ ".vscode"]
    }
  },
  "lint": { "files": {
      "exclude": [ "examples/yew-app/pkg" ]
    } }
}
`;
  await writeFile("deno.json", conf);
})();

// 2.1 create .vscode/settings.json
await Deno.mkdir(".vscode", { recursive: true });
let conf = `{
  "deno.enable": true,
  "deno.lint": true,
  "deno.unstable": true,
  "deno.internalDebug": true,
  "deno.suggest.completeFunctionCalls": true,
  "deno.codeLens.implementations": true,
  "deno.codeLens.references": true,
  "deno.codeLens.referencesAllFunctions": false,
  "deno.codeLens.test": true,
  "editor.defaultFormatter": "denoland.vscode-deno"
}`;
await writeFile(".vscode/settings.json", conf);

// 2.2 create .vscode/launch.json;
conf = `{
  "version": "0.2.0",
  "configurations": [
    {
      "request": "launch",
      "name": "run",
      "type": "pwa-node",
      "program": "\${workspaceFolder}/examples/counter/main.ts",
      "cwd": "\${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": [
        "run",
        "--inspect",
        "--inspect-brk",
        "-A"
      ],
      "smartStep": false,
      "attachSimplePort": 9229
    }
  ]
}`;
await writeFile(".vscode/launch.json", conf);