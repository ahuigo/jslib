/**
 * subprocess.ts
 */
const fileNames = Deno.args;

const process = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-read",
    "https://deno.land/std/examples/cat.ts",
    ...fileNames,
  ],
  stdout: "piped",
  stderr: "piped",
});

// kill process
setTimeout(() => {
  process.kill("SIGINT");
}, 10 * 1000);

const { code } = await process.status();

// Reading the outputs closes their pipes
const rawOutput = await process.output();
const rawError = await process.stderrOutput();


if (code === 0) {
  await Deno.stdout.write(rawOutput);
} else {
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);