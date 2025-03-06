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
Deno.test("test read bytes", async () => {
  const uint8array = await Deno.readFile("./deno.json");
  const text2 = new TextDecoder().decode(uint8array);
  console.log(text2);
});
// read partial
Deno.test("test read partial", async () => {
  // using 是 TypeScript 5.2 引入的一个关键字，用于声明一个资源在使用完毕后会自动释放。它通常用于处理需要显式关闭或释放的资源，如文件、数据库连接等。
  using file = await Deno.open("./deno.json");
  const buf = new Uint8Array(11);
  const numberOfBytesRead = await file.read(buf); // 11 bytes
  const text = new TextDecoder().decode(buf);  // "hello world"
  console.log(text, numberOfBytesRead);
});