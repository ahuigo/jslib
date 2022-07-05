let ws = new WebSocket('ws://localhost:3000/ws/chat');
log = console.log
log('WebSocket - status ' + ws.readyState);
ws.onopen = function (msg) {
    log("Welcome - status " + this.readyState);
    ws.send('hello')
};
ws.onmessage = function (msg) {
    log("Received: " + msg.data);
};
ws.onclose = function (msg) {
    log("Disconnected - status " + this.readyState);
};


