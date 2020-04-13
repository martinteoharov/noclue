const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.onclick = (e) => {
	const formControl = document.getElementsByClassName('form-control');
	const objLogin = {name: formControl[0].value, password: formControl[1].value};

	fetchPost('/login', objLogin).then((res) => {
		console.log(res);
	});
	console.log('login:', objLogin);
}
