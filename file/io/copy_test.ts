// deno run -A read-file.ts ~/tmp/a.txt
// deno run --allow-read https://deno.land/std@0.146.0/examples/cat.ts /etc/hosts
import { copy } from "https://deno.land/std@0.146.0/streams/conversion.ts";
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  await copy(file, Deno.stdout);
  file.close();
}
