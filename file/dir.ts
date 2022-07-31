// Deno.env

// Deno.cwd(".")

// Deno.chdir(".")
export function chdirModule() {
  const rootDir = new URL('.', Deno.mainModule).href.replace(/^file:\/\//, "");
  Deno.chdir(rootDir);
  console.log('cwd', Deno.cwd());
}