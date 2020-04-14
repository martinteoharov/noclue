const btnLog = document.getElementById('logButton');
if(localStorage['JWT']){
	btnLog.innerText = 'Log out';
	btnLog.href = '/';
	btnLog.onclick = () => localStorage['JWT'] = '';
}
else {
	btnLog.innerText = 'Log in';
	btnLog.href = '/login.html';
}
