import handleHttp from './router/router.ts';

const port = 4501;
const server = Deno.listen({ port });
console.log(`File server running on http://localhost:${port}/`);
for await (const conn of server) {
handleHttp(conn).catch(console.error);
}
