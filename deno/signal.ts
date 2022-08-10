/**
 * signal_listeners.ts
 */
console.log("Press Ctrl-C to trigger a SIGINT signal");

const sigIntHandler = () => {
  console.log("interrupted!");
  Deno.exit();
};
Deno.addSignalListener("SIGINT", sigIntHandler);

// Add a timeout to prevent process existing immediately.
setTimeout(() => { }, 5000);

// Stop listening for a signal after 1s.
setTimeout(() => {
  Deno.removeSignalListener("SIGINT", sigIntHandler);
}, 1000);