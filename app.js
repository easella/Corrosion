  
/* -----------------------------------------------
 * Authors: QuiteAFancyEmerald, BinBashBanana (OlyB), YÖCTDÖNALD'S
 * Additional help from Divide and SexyDuceDuce
 * MIT license: http://opensource.org/licenses/MIT
 * ----------------------------------------------- */
const
    corrosion = require('corrosion'),
    path = require('path'),
    fs = require('fs'),
    http = require("http")
    express = require('express'),
    app = express(),
    server = http.createServer(app);


btoa = (str) => {
    return new Buffer.from(str).toString('base64');
}

atob = (str) => {
    return new Buffer.from(str, 'base64').toString('utf-8');
}

const text404 = fs.readFileSync(path.normalize('404.html'), 'utf8'),
    siteIndex = 'index.html',
    cookingInserts = [
        "Random sentence one filled with certain keywords.",
        "Random sentence two filled with certain keywords."
    ],
    splashtext = [
        'Th<wbr>is is si<wbr>mp<wbr>ly a pu<wbr>bl<wbr>ic dem<wbr>o for Ho<wbr>ly Unb<wbr>locke<wbr>r. Certain functions may not work properly. Jo<wbr>in the <a id="tnlink" target="_blank">T<wbr>N Disc<wbr>ord</a> for official site lin<wbr>ks'
    ],
    vegetables = ['Cooking1', 'Cooking2'],
    charRandom = ['&#173;', '&#8203;'];

function randomListItem(lis) {
    return lis[Math.floor(Math.random() * lis.length)];
}

// The inline function returns are necessary to prevent all replaced things from being the same

function insertCharset(str) {
    return str.replace(/&#173;|&#8203;|<wbr>/g, function() { return randomListItem(charRandom); });
}

function insertSplash(str) {
    return str.replace(/&#xFE0F;/g, function() { return splashtext; });
}

function insertCooking(str) {
    return str.replace(/<!-- IMPORTANT-HUCOOKINGINSERT-DONOTDELETE -->/g, function() { return '<span style="display: none;" data-fact="' + randomListItem(vegetables) + '" data-type="' + randomListItem(vegetables) + '">' + randomListItem(cookingInserts) + '</span>'; });
}

function cacheBusting(str) {
    return str.replace(/styles.min.css/g, 'styles-368357.min.css');
}

function insertAll(str) {
    return insertCharset(insertCooking(insertSplash(cacheBusting(str))));
}

/* Cache Busting
const stats = fs.statSync(path.normalize(__dirname + fileMod), 'utf8'), 
	seconds = (new Date().getTime() - stats.mtime);
fs.renameSync(path.normalize(__dirname + fileMod), 'links-' + seconds + '.js');
function cacheBusting(str) {
	return str.replace(/links.js/g, "links" + '-' + seconds + '.js');
}
*/

function tryReadFile(file) {
    return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : text404;
}

// Local Corrosion Proxy

const proxy = new corrosion({
    prefix: '/search/',
    title: 'Untitled Document',
    ws: true,
    codec: 'xor',
    requestMiddleware: [
        corrosion.middleware.blacklist([
            'accounts.google.com',
        ], 'Page is blocked'),
    ],
});

proxy.bundleScripts();
/* Querystring Navigation */
app.get('/', async(req, res) => res.send(insertAll(tryReadFile(path.normalize(__dirname + '/' + (['/', '/?'].includes(req.url) ? siteIndex : pages[Object.keys(req.query)[0]]))))));

/* Static Files Served */
app.use(express.static(path.normalize('index.html')));
app.use((req, res) => {
    if (req.url.startsWith(proxy.prefix)) return proxy.request(req, res);
    res.status(404, res.send(insertAll(text404)))
});


server.listen(process.env.PORT);


console.log('Holy Unblocker is listening on port '+process.env.PORT+'. This is simply a public for Holy Unblocker. Certain functions may not work properly.');
