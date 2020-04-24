// < ---- AUTHENTICATION ---- >
const fetchPost = async (url, body) => {
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

const base64UserPass = (username, password) => {
	const _base64UserPass = 'Basic ' + btoa(username + ':' + password);
	return _base64UserPass;
}
const inputValidation = (type, val) => {
	switch(type){

		case 'first-name':
			return true;
			break;

		case 'last-name':
			return true;
			break;

		case 'email':
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val))
				return (true)
			newNoty('error', 'You have entered an invalid email address!');
			break;

		case 'username':
			if (/^[0-9a-zA-Z_.-]+$/.test(val))
				return (true)
			newNoty('error', 'You have entered an invalid username!');
			break

		case 'password':
			if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val))
				return true;
			newNoty('error', 'You have enetered an invalid password!');

				break;
	}

	return false;
	
}
// < ---- AUTHENTICATION END ---- >




// < ---- NOTY ---- >
let noty = [];
const deleteNoty = (_noty) => {

	// ...remove _noty from noty arr
	const fNoty = noty.find(el => el == _noty);
	const index = noty.indexOf(fNoty);
	// close noty
	noty[index].close();
	// remove from noty arr
	index > -1 ? noty.splice(index, 1) : null;

}
const deleteAllNoty = () => {
	for(let i = 0; i < noty.length - 1; i ++){
		if(!noty[i])
			break;
		noty[i].close();
		noty.shift();
		i--;
	}
}
const newNoty = (type, message) => {
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




