import fileDownHandler from './file-download.ts';
import dumpHandler from './dump-handler.ts';

export default async function router(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    const filepath = decodeURIComponent(url.pathname).replace(/^\//, "");
    switch (filepath.split('/')[0]) {
      case 'f':
        await fileDownHandler(requestEvent); break;
      case 'dump':
        await dumpHandler(requestEvent); break;
      default: {
        const response = new Response(`'404 path ${filepath}`, {
          status: 404,
        });
        await requestEvent.respondWith(response);
      }
    }
  }
}

