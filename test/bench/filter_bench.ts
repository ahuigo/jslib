// deno bench --unstable --filter "/bench-*\d/" .
Deno.bench({
  name: "my-bench",
  fn: () => {/* bench function zero */ },
});
Deno.bench({
  name: "bench-1",
  fn: () => {/* bench function one */ },
});
Deno.bench({
  name: "bench2",
  fn: () => {/* bench function two */ },
});