/**
 * write.ts
 */
function writeFile(path: string, data: string): string {
  try {
    Deno.writeTextFileSync(path, data);
    //writeFileSync( path: string | URL, data: Uint8Array, options?: WriteFileOptions): void;
    return "Written to " + path;
  } catch (e) {
    return e.message;
  }
}
console.log(writeFile("./data.json", "some data"));

/**
 * read file sync
 */
Deno.readTextFileSync("./a.txt")