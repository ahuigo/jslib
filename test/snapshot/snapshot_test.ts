// http://localhost:8000/docs/testing/snapshot_testing
// deno test --allow-all -- --update

import { assertSnapshot } from "$std/testing/snapshot.ts";

Deno.test("isSnapshotMatch", async function (t): Promise<void> {
  const a = {
    hello: "world!",
    example: 123,
  };
  await assertSnapshot(t, a, {
    name: "Test Name"

  });
});