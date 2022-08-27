// Deno.env

export function cwd(): string {
  return Deno.cwd();
}

// Deno.chdir(".")
export function chdirModule() {
  const rootDir = new URL('.', Deno.mainModule).href.replace(/^file:\/\//, "");
  Deno.chdir(rootDir);
  console.log('cwd', Deno.cwd());
}

export function readDirSync(dir: string) {
  return Deno.readDirSync(dir);
}