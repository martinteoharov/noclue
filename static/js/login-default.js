const btnSignIn = document.getElementById('btnSignIn');
const btnSignUp = document.getElementById('btnSignUp');

btnSignIn.onclick = (e) => {
	e.preventDefault();
	if(document.getElementById('form-email'))
		document.getElementById('form-email').parentNode.parentNode.remove();
	if(document.getElementById('form-first-name'))
		document.getElementById('form-first-name').parentNode.parentNode.remove();
	if(document.getElementById('form-last-name'))
		document.getElementById('form-last-name').parentNode.parentNode.remove();

	const username = document.getElementById('form-username').value;
	const password = document.getElementById('form-password').value;

	const credentials = {'username':username, 'password':password};
	const base64credentials = base64UserPass(username, password); //encrypt credentials

	fetchPost('/users/authenticate', credentials).then((res) => {
		console.log(res);
		if(res.success){
			//setTimeout(() => window.location.href = '/', 1000);
			localStorage.setItem('JWT', res.token);
			localStorage.setItem('user', res.user);
			localStorage.setItem('username', res.user.username);
		}
		else {
			newNoty('error', 'Wrong Credentials');
		}

		autoLogin(localStorage['JWT'], res);
	});
}

btnSignUp.onclick = (e) => {
	e.preventDefault();
	const form = document.getElementById('default-login-form');

	if(!document.getElementById('form-email')){

		const forgotPasswordEl   = document.getElementById('forgot-password');
		const usernameDivEl      = document.getElementById('form-username-div');
		const passwordDivEl      = document.getElementById('form-password-div');
		const usernameEl         = document.getElementById('form-username');
		const passwordEl         = document.getElementById('form-password');
		let emailDivEl;
		let emailEl;
		let firstNameDivEl;
		let firstNameEl;
		let lastNameDivEl
		let lastNameEl;

		//Email address
		emailDivEl         = document.getElementById('form-username-div').cloneNode(true);
		emailEl            = emailDivEl.childNodes[1].childNodes[1];
		emailEl.classList.add('fade-in');
		emailEl.placeholder      = 'Email...';
		emailEl.id               = 'form-email';
		emailEl.type             = 'email';
		emailEl.name             = 'form-email';

		//First Name
		firstNameDivEl     = document.getElementById('form-username-div').cloneNode(true);
		firstNameEl        = firstNameDivEl.childNodes[1].childNodes[1];
		firstNameDivEl.classList.add('fade-in');
		firstNameEl.placeholder = 'First Name...';
		firstNameEl.id          = 'form-first-name';
		firstNameEl.name        = 'form-first-name';

		//Last Name
		lastNameDivEl      = document.getElementById('form-username-div').cloneNode(true);
		lastNameEl         = lastNameDivEl.childNodes[1].childNodes[1];
		lastNameDivEl.classList.add('fade-in');
		lastNameEl.placeholder = 'Last Name...';
		lastNameEl.id          = 'form-last-name';
		lastNameEl.name        = 'form-last-name';

		setTimeout(() => form.insertBefore(firstNameDivEl, usernameDivEl), 50);
		setTimeout(() => form.insertBefore(lastNameDivEl, usernameDivEl), 100);
		setTimeout(() => form.insertBefore(emailDivEl, usernameDivEl), 150);
	}
	//check fields for data
	const emailEl     = document.getElementById('form-email');
	const firstNameEl = document.getElementById('form-first-name');
	const lastNameEl  = document.getElementById('form-last-name');
	const usernameEl  = document.getElementById('form-username');
	const passwordEl  = document.getElementById('form-password');
	
	const forSubmit = [firstNameEl, lastNameEl, emailEl, usernameEl, passwordEl];
	let pass;
	if(emailEl){ // check if objects are created by checking only the emailEl
		pass = true;
		for(const i of forSubmit){
			const type = i.name.substring(5);
			if(!inputValidation(type, i.value))
				pass = false;
		}
	}
	
	if(pass){
		//send a sign up request to server
		const obj = { email: emailEl.value, username: usernameEl.value, password:passwordEl.value, firstName: firstNameEl.value, lastName: lastNameEl.value }
		fetchPost('/users/signUp', obj).then((res) => {
			console.log(res);
		});
	}
}
