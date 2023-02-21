import handleHttp from '../router/router.ts';

Deno.test("main server", async () => {
  const port = 4501;
  const server = Deno.listen({ port });
  console.log(`File server running on http://localhost:${port}/`);
  for await (const conn of server) {
    handleHttp(conn).catch(console.error);
  }
});


//  nc  localhost 4502 
import { copy } from "$std/streams/conversion.ts";
Deno.test("echo server", async () => {
  const port = 4502;
  const server = Deno.listen({ port });
  console.log(`File server running on http://localhost:${port}/`);
  for await (const conn of server) {
    copy(conn, conn).finally(() => conn.close());
  }
});