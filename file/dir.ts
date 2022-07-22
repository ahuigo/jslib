// Deno.env

// Deno.cwd(".")

// Deno.chdir(".")
function chdirFile() {
  const rootDir = new URL('.', Deno.mainModule).href.replace(/^file:\/\//, "");
  Deno.chdir(rootDir);
  console.log('cwd', Deno.cwd());
}