const corrosion = require('corrosion');
const proxy = new corrosion({
    prefix: '/service/',
    title: 'Untitled Document',
    ws: true,
    codec: 'xor',
    requestMiddleware: [
        corrosion.middleware.blacklist([
            'accounts.google.com',
        ], 'Page is blocked'),
    ],
});

const http = require('http')
http.createServer((req, res) => 
  proxy.request(req, res) // Request Proxy
).on('upgrade', (req, socket, head) => 
  proxy.upgrade(req, socket, head) // WebSocket Proxy
).listen(process.env.PORT);
console.log("running")
