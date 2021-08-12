const https = require('https');
const fs = require('fs');
const path = require('path');
const ssl = {
    key: fs.readFileSync(path.join(__dirname, 'demo/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, 'demo/ssl.cert')),
};
const server = https.createServer(ssl);
const Corrosion = require('corrosion');
const proxy = new Corrosion({
    codec: 'xor',
});

proxy.bundleScripts();

server.on('request', (request, response) => {
    if (request.url.startsWith(proxy.prefix)) return proxy.request(request, response);
    response.end(fs.readFileSync('/index.html', 'utf-8'));
}).on('upgrade', (clientRequest, clientSocket, clientHead) => proxy.upgrade(clientRequest, clientSocket, clientHead)).listen(process.env.PORT);

console.log("https server listening on "+process.env.PORT)