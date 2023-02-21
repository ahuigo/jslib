async function generateEtag(name: string) {
  const encoder = new TextEncoder();
  const etag = await crypto.subtle.digest(
    "SHA-1",
    encoder.encode(name),
  ).then((hash) =>
    Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  );
  return etag;

}

Deno.test('readHttpStream', () => {
  const href = 'http://m:8000/md/a/b/c.md';
  const req = new Request(href);
  const _ = (async () => {
    const url = new URL(req.url);
    const localUrl = url.pathname;
    const file = await Deno.open(localUrl);
    const size = (await file.stat()).size;
    const mtime = (await file.stat()).mtime;
    const ifModifiedSince = req.headers.get('if-modified-since')!;
    const isNotModified = ifModifiedSince && (new Date(ifModifiedSince)) >= mtime!;
    if (isNotModified) {
      return new Response(null, { status: 304 });
    }

    if (url.search.includes("useCache")) {
      const location = url.pathname + url.search;
      return new Response("", {
        status: 307,
        headers: {
          "content-type": "text/plain",
          location,
        },
      });
    }
    const etag = await generateEtag(url.pathname);
    const headers = new Headers({
      "content-type": "text/plain",
      etag,
      vary: "If-None-Match",
    });
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    const ifNoneMatch = req.headers.get("if-none-match");
    if (ifNoneMatch === etag || ifNoneMatch === "W/" + etag) {
      return new Response(null, { status: 304, headers });
    } else {
      headers.set("content-length", String(size));
      return new Response(file.readable, { headers });
    }
  })();
});
