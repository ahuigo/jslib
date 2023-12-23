# deno deploy
https://www.reddit.com/r/Deno/comments/18o7c84/what_container_does_deno_deploy_use/

Deno 的 Isolate 是基于 V8 的 Isolate，它是 Deno 运行时的基础组件，用于执行 JavaScript 代码。在 Deno 中，你不能直接创建一个 Isolate，因为 Deno 运行时会为每个执行的脚本自动创建一个 Isolate。

然而，你可以使用 Deno 的 Worker API 来创建一个新的执行环境，这个执行环境在一个新的 Isolate 中运行，与主线程是隔离的。

## Deno deploy isolate
> https://www.reddit.com/r/Deno/comments/18o7c84/what_container_does_deno_deploy_use/
How to start Deno Workers with **resource limit** like Deno Deploy?

Kenton Varda did a presentation on **V8 Isolates** where he talks about **resource limits** at 18:18.

1. Memory usage is monitored using the `isolate.GetHeapStatistics()` method. Isolates that go over the limit are given a small grace period to reduce their memory or they're killed.
2. CPU usage is limited using a timer`timer_create(CLOCK_THREAD_CPUTIME_ID)`. When the timer runs out, the **isolate is killed**.

Kenton Varda is the tech lead of Cloudflare Workers, which is not the same as Deno Deploy, but the technology behind those products are very similar.

If you want to do something like this, you should embed Deno in your application and control the isolates in rust. You can use `deno_core`, and the deno op crates to embed deno in your application.

# Worker
cpu num: navigator.hardwareConcurrency
chrome: window.performance

## limit cpu/mem
    limit: cpu + memory
    query: cpu + memory

Some articles:
- limit for webworkers: https://github.com/denoland/deno/issues/10036
    - deno_core create deno runtime manually: https://crates.io/crates/deno_core



