import { readAll } from '$std/streams/conversion.ts';
//stdin/stdout/file is reader/writer
Deno.test('std reader', async () => {
  const bytes = new Uint8Array(10);
  await Deno.stdin.read(bytes);

  // read all
  await readAll(await Deno.open('a.png'));
  await readAll(Deno.stdin);
});

Deno.test('std writer', async () => {
  await Deno.stdout.write(new Uint8Array([48, 49]));
});
