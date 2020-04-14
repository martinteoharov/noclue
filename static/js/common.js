const fetchPost = async (url, body) => {
        console.log('fetchPost');
        const response = await fetch(url, {
                method: "POST",
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
        });
        return await response.json(); // parses JSON response into native JavaScript objects
}

const fetchGet = async (url) => {
        console.log('fetchGet');
        const response = await fetch(url, {
                method: "GET",
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                }
        });
        return await response.json(); // parses JSON response into native JavaScript objects
}

const fetchPostAuth = async (url, body, JWT) => {
        console.log('fetchPostAuth:');
        const response = await fetch(url, {
                method: "POST",
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
			'JWT': JWT
                },
                body: JSON.stringify(body)
        });
        return await response.json(); // parses JSON response into native JavaScript objects
}

const fetchPostLogin = async (url, body, b64credentials) => {
        console.log('fetchPostAuth:');
        const response = await fetch(url, {
                method: "POST",
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
			'credentials': b64credentials
                },
                body: JSON.stringify(body)
        });
        return await response.json(); // parses JSON response into native JavaScript objects
}

const newNoty = (type, message) => {
        console.log('newNoty:');
	new Noty({
		type: type,
		layout: 'topRight',
		text: message,
		theme: 'bootstrap-v4',
		timeout:2000
	}).show();
}

const base64UserPass = (username, password) => {
	const _base64UserPass = 'Basic ' + btoa(username + ':' + password);
	return _base64UserPass;
}
