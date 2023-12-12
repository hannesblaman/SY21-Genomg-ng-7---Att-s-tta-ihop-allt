let http = require('http');
let MongoClient = require('mongodb').MongoClient;
let port = 3000;

let staticFileHandler = require('./staticFileHandler');
let routeHandler = require('./routeHandler');

async function handleRequest(request, response) {

	let mongoConn = await MongoClient.connect('mongodb://127.0.0.1:27017');
	let db = mongoConn.db('lektion7');

	let url = new URL(request.url, 'http://' + request.headers.host);
	let path = url.pathname;
	let pathSegments = path.split('/').filter(function (element) {
		return element !== '';
	});

	if (pathSegments.length > 0
		&& pathSegments[0] === 'static'
		&& request.method === 'GET') {

			staticFileHandler.handleStaticFileRoute(pathSegments, response);
			return;

	}

	routeHandler.handleRoute(url, pathSegments, db, request, response);

}

let app = http.createServer(handleRequest);

app.listen(port, function () {
	console.log(`Server listening on port ${port}`);
});
