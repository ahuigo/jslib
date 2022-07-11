/**
 * //http://localhost:8000/docs/testing/mocking
// https://deno.land/std@$STD_VERSION/testing/mock_examples/interval_test.ts
 * function overrideGlobals(): void {
  globalThis.Date = FakeDate as DateConstructor;
  globalThis.setTimeout = fakeSetTimeout;
  globalThis.clearTimeout = fakeClearTimeout;
  globalThis.setInterval = fakeSetInterval;
  globalThis.clearInterval = fakeClearInterval;
}
 */
import {
  assertSpyCalls,
  spy,
} from "$std/testing/mock.ts";
import { FakeTime } from "$std/testing/time.ts";
import { secondInterval } from "$std/testing/mock_examples/interval.ts";

Deno.test("secondInterval calls callback every second and stops after being cleared", () => {
  const time = new FakeTime();

  try {
    const cb = spy();
    const intervalId = secondInterval(cb);
    assertSpyCalls(cb, 0);
    time.tick(500);
    assertSpyCalls(cb, 0);
    time.tick(500);
    assertSpyCalls(cb, 1);
    time.tick(3500);
    assertSpyCalls(cb, 4);

    clearInterval(intervalId);
    time.tick(1000);
    assertSpyCalls(cb, 4);
  } finally {
    time.restore();
  }
});