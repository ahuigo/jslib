# Resource sanitizer
By default, for all test definition:
1. the test runner **checks** that all resources created in this test have been closed.
2. This is to prevent resource 'leaks'. 

We can be disabled by setting the sanitizeResources boolean to false in the test definition.

    Deno.test({
        name: "leaky resource test",
        async fn() {
            await Deno.open("hello.txt");
        },
        sanitizeResources: false,
    });

# Op sanitizer
> The test runner checks that each operation you start in the test **is completed** before the end of the test

disabled async operation's check via sanitizeOps

    Deno.test({
      name: "leaky operation test",
      fn() {
        crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode("a".repeat(100000000)),
        );
      },
      sanitizeOps: false,
    });

## Exit sanitizer
There's also the exit sanitizer which ensures that tested code doesn't call Deno.exit() signaling a false test success.

We can be disabled by setting `sanitizeExit:false` to ignore exit checks

    Deno.test({
      name: "false success",
      fn() {
        Deno.exit(0);
      },
      sanitizeExit: false,
    });
    
    // This test never runs, because the process exits during "false success" test
    Deno.test({
      name: "failing test",
      fn() {
        throw new Error("this test fails");
      },
    });