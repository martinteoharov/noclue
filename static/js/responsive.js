const btnLog = document.getElementById('logButton');
const autoLogin = (jwt) => {
	fetchPostAuth('/users/sessionCheck', {body: ''}, jwt).then((res) => {
		console.log('autoLogin:', res);
		if(res.success){
			btnLog.innerText = 'Log out';
			btnLog.href = '/';
			btnLog.onclick = () => localStorage['JWT'] = '';
			newNoty('success', 'Wellcome back, ' + res.user.user.username + '!');
		}
		else {
			btnLog.innerText = 'Log in';
			btnLog.href = '/login.html';
		}
	});
}
if(localStorage['JWT'] != '')
	autoLogin(localStorage['JWT']);
else {
	btnLog.innerText = 'Log in';
	btnLog.href = '/login.html';

}
