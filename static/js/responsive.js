
// Responsive elements variables
const btnLog         = document.getElementById('logButton');
const loginForm      = document.getElementById('communication-logged-out');
const loginChat      = document.getElementById('communication-logged-in');
const saveBtn        = document.getElementById('savePageButton');
const toggleGodBtn   = document.getElementById('toggleGod');
const btnDashboard   = document.getElementById('dashboard-btn');

const logSequence = (logged, user) => {
	const {username, role} = user;

	if(logged) {
		btnLog.innerText = 'Log out';
		btnLog.href = '/';
		btnLog.onclick = () => {
			localStorage['JWT'] = '';
			localStorage['user'] = '';
		}
		if(username)
			newNoty('success', 'Wellcome back, ' + username + '!');

		if(role == 'admin'){
			saveBtn.style.display = '';
			toggleGodBtn.style.display = '';
			btnDashboard.style.display = '';
		}

		loginChat.style.display   = '';
		loginForm.classList.add('fade-out');
		setTimeout(() => {loginForm.style.display = 'none';loginForm.classList.remove('fade-out')}, 1500);
		initSocket();
	}
	else {

		btnLog.innerText = 'Log in';
		btnLog.href = '#default-login-form';

		saveBtn.style.display = 'none';
		btnDashboard.style.display = 'none';
		toggleGodBtn.style.display = 'none';
		loginForm.classList.remove('fade-out');
		loginForm.style.display = '';
		loginChat.style.display   = 'none';
	}
}
const autoLogin = (jwt, res) => {
	fetchPostAuth('/users/sessionCheck', {body: ''}, jwt).then((res) => {
		console.log('autoLogin:', res.user.user);
		logSequence(res.success, res.user.user);
	});
}
if(localStorage['JWT'] != '' && localStorage['JWT'] != undefined){
	autoLogin(localStorage['JWT']);
}
else {
	logSequence(false, {username:null});
}
