//deno run --allow-read --allow-write x.ts
//
/**
 * write.ts
 */
await Deno.writeTextFile("./a.log", "Hello World!");
console.log("File written to ./a.log");

/**
 * read.ts
 */
const text = await Deno.readTextFile("./a.log");
console.log(text);

