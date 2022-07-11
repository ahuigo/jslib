// deno bench --unstable url_bench.ts
Deno.bench("URL parsing", () => {
  new URL("https://deno.land");
});