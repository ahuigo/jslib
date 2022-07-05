import {assertEquals} from "https://deno.land/std@0.129.0/testing/asserts.ts";

Deno.test("database", async (t) => {
  await t.step("insert user", async () => {
      const a=1
    assertEquals(a, 1);
  });
  await t.step("insert user2", async () => {
      const a=1;
    assertEquals(a, 2);
  });
  await t.step("insert user3", async () => {
      const a=1;
    assertEquals(a, 1);
  });

});
