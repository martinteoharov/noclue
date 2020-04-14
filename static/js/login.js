const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.onclick = (e) => {
	const formControl = document.getElementsByClassName('form-control');


	const credentials = {'username':formControl[0].value, 'password':formControl[1].value};
	const base64credentials = base64UserPass(formControl[0].value, formControl[1].value); //encrypt credentials

	fetchPost('/users/authenticate', credentials).then((res) => {
		console.log(res);
		if(res.success){
			localStorage.setItem('JWT', res.token);
			window.location.href = '/';
		}
		else {
			newNoty('error', 'Wrong Credentials');
		}

	});
	console.log('login:', base64credentials);
}
