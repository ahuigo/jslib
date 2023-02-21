run:
	deno run -A ./main.ts
cache:
	deno cache --lock=lock.json --lock-write server/main.ts
