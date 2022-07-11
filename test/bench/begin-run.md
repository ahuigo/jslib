# run bench
    # Run all benches in the current directory and all sub-directories
    deno bench

    # Run all benches in the util directory
    deno bench util/

    # Run just my_bench.ts
    deno bench my_bench.ts

## pass arguments
    # Pass additional arguments to the bench file
    deno bench my_bench.ts -- -e --foo --bar

## filter bench

### filter name
    // see filter_bench.ts
    deno bench --unstable --filter "/bench-*\d/" .

### filter out
    Deno.bench({
        name: "bench windows feature",
        ignore: Deno.build.os === "windows",
        fn() {
            // do windows feature
        },
    });

### Filtering in (only run these benches)
    Deno.bench({
      name: "Focus on this bench only",
      only: true,
      fn() {
        // bench complicated stuff
      },
    });