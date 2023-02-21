// import { readAll } from '$std/streams/conversion.ts';
import { readStreamString } from '$/file/io/str-stream.ts';
export default async function fileHandler(requestEvent: Deno.RequestEvent) {
  const request = requestEvent.request;
  const url = new URL(requestEvent.request.url);
  const pathname = decodeURIComponent(url.pathname);
  /**
GET m:4500/dump/adfasdf? proto:1 proto:HTTP/1.1 clientip:::1
User-Agent: curl/7.79.1

c.Request.Host(include port):m:4500
c.Request.URL.Host(invalid):
origin:
originDomain:
cookieDomain:m
referer:
   */
  // headers
  let headers = `${request.method} ${pathname} \n`;
  //  requestEvent.request.headers.get("user-agent") ?? "Unknown"
  for (const [k, v] of (requestEvent.request.headers)) {
    headers += k + ": " + v + '\n';
  }
  headers += "url: " + request.url + '\n';
  // requestEvent.request.body.
  let reqBody = "";
  if (request.body) {
    reqBody = await readStreamString(request.body!);
  }

  const body = headers + '\n' + `${reqBody}`;

  await requestEvent.respondWith(
    new Response(body, {
      status: 200,
    }),
  );
}