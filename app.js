const Corrosion = require('Corrosion');
const proxy = new Corrosion();
const http = require('http')
http.createServer((req, res) => 
  proxy.request(req, res) // Request Proxy
).on('upgrade', (req, socket, head) => 
  proxy.upgrade(req, socket, head) // WebSocket Proxy
).listen(process.env.PORT);
console.log("listening on "+process.env.PORT)
