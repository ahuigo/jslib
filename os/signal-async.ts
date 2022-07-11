/**
 * async_iterator_signal.ts
 * http://localhost:8000/docs/examples/os_signals
 */
import { signal } from "$std/signal/mod.ts";

// Add a timeout to prevent process exiting immediately.
setTimeout(() => { }, 2000);

// Deno.test("async signal", async () => {
// });
const sig = signal("SIGUSR1", "SIGINT");
for await (const _ of sig) {
  console.log("interrupt or usr1 signal received");
}

