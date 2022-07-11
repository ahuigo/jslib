---
title: run deno test
date: 2022-07-10
private: true
---
# test rule
file name rule:

    files named test.{ts, tsx, mts, js, mjs, jsx, cjs, cts},
    or files ending with .test.{ts, tsx, mts, js, mjs, jsx, cjs, cts},
    or files ending with _test.{ts, tsx, mts, js, mjs, jsx, cjs, cts}

# run test
## run all(recursive test)

    deno test

## run single test file
    deno test a_test.ts

## Failing fast
If you have a long-running test suite and wish for it to stop on the first failure,

    deno test --fail-fast

# filter test
## filter test name(regex)
Assuming the following tests:

    Deno.test({ name: "my-test", fn: myTest });
    Deno.test({ name: "test-1", fn: test1 });
    Deno.test({ name: "test-2", fn: test2 });

run the second and third tests.

    deno test --filter "/test-*\d/" tests/

## Test definition filtering
### Filtering out (Ignoring these tests)

    Deno.test({
        name: "do macOS feature",
        ignore: Deno.build.os !== "darwin",
        fn() {
            // do MacOS feature here
        },
    });

### Filtering in (Only run these tests)
Sometimes you may be in the middle of a problem within a large test class and you would like to focus on just that test and ignore the rest for now. 

    Deno.test({
        name: "Focus on this test only, stop other test case",
        only: true,
        fn() {
            // test complicated stuff here
        },
    });