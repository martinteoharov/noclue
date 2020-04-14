const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.onclick = (e) => {
	const formControl = document.getElementsByClassName('form-control');


	const credentials = {'username':formControl[0].value, 'password':formControl[1].value};
	const base64credentials = base64UserPass(formControl[0].value, formControl[1].value); //encrypt credentials

	fetchPost('/users/authenticate', credentials).then((res) => {
		console.log(res);
		if(res.success){
			newNoty('success', 'Logged in successfuly, redirecting..');
			console.log(res);
			localStorage.setItem('JWT', res.token);
			localStorage.setItem('username', res.user.username);
			setTimeout(() => window.location.href = '/', 1000);
		}
		else {
			newNoty('error', 'Wrong Credentials');
		}

	});
	console.log('login:', base64credentials);
}
