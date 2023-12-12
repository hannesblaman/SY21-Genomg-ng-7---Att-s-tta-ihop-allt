exports.handleRoute = async function (url, pathSegments, db, request, response) {

	if (pathSegments.length === 0) {
		// Skicka index

		return;
	}

	let seg = pathSegments.shift();


	switch (seg) {
		case 'dsadsa':
			break;
	}

}