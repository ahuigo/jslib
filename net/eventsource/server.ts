let BUILD_ID = 1;

async function staticHandler(requestEvent: Deno.RequestEvent) {
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
    const cwd = Deno.cwd();
    const notFoundResponse = new Response(`404 cwd:${cwd} ${e}`, { status: 404 });
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


async function aliveHandler(requestEvent: Deno.RequestEvent) {
  let timerId: number | undefined = undefined;
  let count = 0;
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(`data: ${BUILD_ID}\nretry: 100\n\n`);
      timerId = setInterval(() => {
        if ((++count) % 25 == 0) {
          BUILD_ID++;
        }
        controller.enqueue(`data: ${BUILD_ID}\n\n`);
      }, 1000);
    },
    cancel() {
      if (timerId !== undefined) {
        clearInterval(timerId);
      }
    },
  });
  const response = new Response(body.pipeThrough(new TextEncoderStream()), {
    headers: {
      "content-type": "text/event-stream",
    },
  });
  await requestEvent.respondWith(response);
}

async function router(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    let filepath = decodeURIComponent(url.pathname).replace(/^\//, "");
    if (filepath == "") {
      filepath = "eventsource.html";
    }
    if (filepath.endsWith(".html")) {
      await staticHandler(requestEvent);
      continue;
    }
    switch (filepath.split('/')[0]) {
      case 'alive':
      case 'api':
        await aliveHandler(requestEvent); break;
      default: {
        const response = new Response(`404 path ${filepath}`, {
          status: 404,
        });
        await requestEvent.respondWith(response);
      }
    }
  }
}


Deno.test("main", async () => {
  const port = 4503;
  const server = Deno.listen({ port });
  console.log(`File server running on http://localhost:${port}/`);

  const rootDir = new URL('.', Deno.mainModule).href.replace(/^file:\/\//, "");
  Deno.chdir(rootDir);
  console.log('cwd', Deno.cwd());

  for await (const conn of server) {
    console.log('conn', conn);
    router(conn).catch(console.error);
  }
});