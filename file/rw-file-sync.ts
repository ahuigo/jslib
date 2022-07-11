/**
 * write.ts
 */
function writeFile(path: string, data: string): string {
  try {
    Deno.writeTextFileSync(path, data);
    return "Written to " + path;
  } catch (e) {
    return e.message;
  }
}

/**
 * read file sync
 */
// Deno.readTextFileSync(path)

console.log(writeFile("./data.json", "some data"));
