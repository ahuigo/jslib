import { assertEquals, assertExists, assert } from "$std/testing/asserts.ts";
import {
  assertStrictEquals, assertAlmostEquals, assertArrayIncludes, assertObjectMatch, assertThrows,
  assertRejects,
} from "$std/testing/asserts.ts";
// The assert method is a simple 'truthy' assertion and can be used to assert any value which can be inferred as true.
Deno.test("Test Assert", () => {
  const res = 1;
  assert(res, "no result");
  assert("Hello");
  assert(true);
});

//The assertExists can be used to check if a value is not null or undefined.
Deno.test("Test Assert Exists", () => {
  assertExists("Denosaurus");
  assertExists(false);
  assertExists(0);
});

// There are three equality assertions available, assertEquals(), assertNotEquals() and assertStrictEquals().
Deno.test("Test Assert Equals", () => {
  assertEquals(1, 1);
  assertEquals("Hello", "Hello");
  assertEquals(true, true);
  assertStrictEquals(0.25 + 0.25, 0.5);
  assertEquals(undefined, undefined);
});


// assert throw exception
Deno.test("Test Assert Throws", () => {
  assertThrows(
    () => { throw new Error("Panic!"); },
    Error,
    "Panic!",
  );
});
Deno.test("Test Assert Strict Equals with float numbers", () => {
  assertThrows(() => assertStrictEquals(0.1 + 0.2, 0.3));
  //0.1 + 0.2 will be stored as 0.30000000000000004 instead of 0.3
});

Deno.test("Assert reject", async () => {
  // assert reject
  await assertRejects(
    () => {
      return Promise.reject(new Error("Panic! Reject Error"));
    },
    Error,
    "Panic! Reject Error",
  );
});

Deno.test("Test Assert Almost Equals", () => {
  assertAlmostEquals(0.1 + 0.2, 0.3);
  assertAlmostEquals(0.1 + 0.2, 0.3, 1e-16);
  assertThrows(() => assertAlmostEquals(0.1 + 0.2, 0.3, 1e-17));
});

// Contains
Deno.test("Test Assert Array Contains", () => {
  // assertStringIncludes("Hello World", "Hello");
  assertArrayIncludes([1, 2, 3], [1]);
  assertArrayIncludes([1, 2, 3], [1, 2]);
  assertArrayIncludes(Array.from("Hello World"), Array.from("Hello"));
});


// Object
//Use assertObjectMatch to check that a JavaScript object matches a subset of the properties of an object.
Deno.test("Test Object subset", () => {
  // Simple subset
  assertObjectMatch(
    { foo: true, bar: false },
    {
      foo: true,
    },
  );
});