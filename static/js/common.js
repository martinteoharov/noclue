// < ---- AUTHENTICATION ---- >
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
// < ---- AUTHENTICATION END ---- >




// < ---- NOTY ---- >
let noty = [];
const deleteNoty = (_noty) => {
	console.log('noty-array-before: ', noty);

	// ...remove _noty from noty arr
	const fNoty = noty.find(el => el == _noty);
	const index = noty.indexOf(fNoty);
	// close noty
	noty[index].close();
	// remove from noty arr
	index > -1 ? noty.splice(index, 1) : null;


	console.log('noty-array-after: ', noty);
}
const deleteAllNoty = () => {
	for(const i of noty){
		deleteNoty(i);
	}
}
const newNoty = (type, message) => {
        console.log('newNoty:');
	const _noty = new Noty({
		type: type,
		layout: 'topRight',
		text: message,
		theme: 'bootstrap-v4',
	}).show();
	noty.push(_noty);
	setTimeout(() => deleteNoty(_noty), 2000);
}
// < ---- NOTY END ---- >




// < ---- CRYPT ---- >
const base64UserPass = (username, password) => {
	const _base64UserPass = 'Basic ' + btoa(username + ':' + password);
	return _base64UserPass;
}
// < ---- CRYPT END ---- >
