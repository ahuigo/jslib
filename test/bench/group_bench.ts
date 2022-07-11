// deno bench --unstable group_bench.ts
// It is useful to assign several cases to a single group and compare how they perform against a "baseline" case.
// time_bench.ts
Deno.bench("Date.now()", { group: "timing", baseline: true }, () => {
  Date.now();
});

Deno.bench("performance.now()", { group: "timing" }, () => {
  performance.now();
});