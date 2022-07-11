import { assertEquals } from "$std/testing/asserts.ts";

function sleep(n: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${n} seconds elapsed`);
      resolve(n);
    }, n * 1000);
  });
}

Deno.test("sleep", async () => {
  await sleep(1);
});


Deno.test("url test", () => {
  const url = new URL("./foo.js", "https://deno.land/");
  assertEquals(url.href, "https://deno.land/foo.js");
  assertEquals(url.href, "https://deno.land/foo.js");
});
