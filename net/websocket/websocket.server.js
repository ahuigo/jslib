if(process.argv.includes('client')){
    const WebSocket = require('ws');
    let count = 0;

    let ws = new WebSocket('ws://localhost:3000/ws/chat');

    ws.on('open', function () {
        console.log(`[CLIENT] open()`);
        ws.send('Hello!');
    });

    ws.on('message', function (message) {
        console.log(`[CLIENT] Received: ${message}`);
        count++;
        if (count > 3) {
            ws.send('Goodbye!');
            ws.close();
        } else {
            setTimeout(() => {
                ws.send(`Hello, I'm Mr No.${count}!`);
            }, 1000);
        }
    });
}else{
    const WebSocket = require('ws');
    const WebSocketServer = WebSocket.Server;

    // 实例化:
    const wss = new WebSocketServer({
        port: 3000
    });

    //响应
    wss.on('connection', function (ws, req) {
        ws.upgradeReq = req;
        console.log(`[SERVER] connection()`);
        console.log(ws.upgradeReq.url);
        for(let k in req){
            //console.log(k,req[k])
        }
        ws.on('message', function (message) {
            console.log(`[SERVER] Received: ${message}`);
            ws.send(`ECHO: ${message}`, (err) => {              //可多次
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        })
    });
}
