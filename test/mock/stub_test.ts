// https://deno.land/std@$STD_VERSION/testing/mock_examples/random_test.ts
import {
  assertSpyCall,
  assertSpyCalls,
  returnsNext,
  stub,
} from "$std/testing/mock.ts";
import { assertEquals } from "$std/testing/asserts.ts";
import {
  _internals,
  randomMultiple,
} from "$std/testing/mock_examples/random.ts";

Deno.test("randomMultiple uses randomInt to generate random multiples between -10 and 10 times the value", () => {
  const randomIntStub = stub(_internals, "randomInt", returnsNext([-3, 3]));

  try {
    assertEquals(randomMultiple(5), -15);
    assertEquals(randomMultiple(5), 15);
  } finally {
    // unwraps the randomInt method on the _internals object
    randomIntStub.restore();
  }

  // asserts that randomIntStub was called at least once and details about the first call.
  assertSpyCall(randomIntStub, 0, {
    args: [-10, 10],
    returned: -3,
  });
  // asserts that randomIntStub was called at least twice and details about the second call.
  assertSpyCall(randomIntStub, 1, {
    args: [-10, 10],
    returned: 3,
  });

  // asserts that randomIntStub was only called twice.
  assertSpyCalls(randomIntStub, 2);
});