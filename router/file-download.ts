
export default async function fileHandler(requestEvent: Deno.RequestEvent) {
  const url = new URL(requestEvent.request.url);
  const filepath = decodeURIComponent(url.pathname);

  // Try opening the file
  let file;
  try {
    if (filepath.endsWith("/")) {
      throw new Error(`this is path:${filepath}`);
    }
    file = await Deno.open("." + filepath, { read: true });
  } catch (e) {
    const notFoundResponse = new Response(`404${e}`, { status: 404 });
    await requestEvent.respondWith(notFoundResponse);
    return;
  }

  // Build a readable stream so the file doesn't have to be fully loaded into
  // memory while we send it
  const readableStream = file.readable;

  // Build and send the response
  const response = new Response(readableStream);
  await requestEvent.respondWith(response);
}