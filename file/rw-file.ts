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
// read to text
const text = await Deno.readTextFile("./a.log");
console.log(text);

// read to Uint8Array ->
Deno.test("test read bytes", async() => {
  const uint8array = await Deno.readFile("./deno.json")
  const text2 = new TextDecoder().decode(uint8array)
  console.log(text2)
})