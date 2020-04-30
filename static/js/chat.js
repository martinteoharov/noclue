let socket;
const chatDOM    = document.getElementById('chat');
const usersDOM   = document.getElementById('users');
const chatBtn    = document.getElementById('chat-submit');
const chatInput  = document.getElementById('chat-input');

const template = {
	usersP:      document.getElementById('users-p-template'),
	chatRecieve: document.getElementById('chat-recieve-template'),
	chatSend:    document.getElementById('chat-send-template')
}

/* MESSAGE TEMPLATE
{
	body:     _body,
	date:     _date,
}
*/
const appendChatDom = (msg) => {
	if(msg.username === localStorage['username']){ //you have send this message
		//message send template
		const csClone = template.chatSend.cloneNode(true);

		csClone.childNodes[1].src = 'img/pfp/' + msg.username + '.jpg';
		console.log(csClone.childNodes[1].src);

		csClone.childNodes[3].innerText = msg.body;
		csClone.childNodes[5].innerText = msg.date;
		csClone.style.display = '';
		chatDOM.append(csClone);
	}
	else {
		//message recieve template
		const crClone = template.chatRecieve.cloneNode(true);

		crClone.childNodes[1].src = 'img/pfp/' + msg.username + '.jpg';
		console.log(crClone.childNodes[1].src);

		crClone.childNodes[3].innerText = msg.body;
		crClone.childNodes[5].innerText = msg.date;
		crClone.style.display = '';
		chatDOM.append(crClone);
	}

}
const initChatDom = (user) => {
	chatDOM.parentNode.style.display  = '';
	usersDOM.style.display = 'none';

	//request history
	socket.emit('request_history', user);

	//download chat history
	socket.on('history', (history) => {
		console.log(history);
		//paste chat history in chat
		chatDOM.innerHTML = '';
		for(const i of history){
			appendChatDom(i);
		}
		chatDOM.scrollTop = chatDOM.scrollHeight;
	});

	socket.on('message', (msg) => {
		appendChatDom(msg);
		chatDOM.scrollTop = chatDOM.scrollHeight;
	});

	chatBtn.onclick = () => {
		//send 
		const obj = {
			'body': chatInput.value,
			'reciever': user,
			'date': new Date()
		}
		chatInput.value = '';
		console.log('socket: message, ', obj);
		socket.emit('message', obj);
	}
	chatInput.addEventListener('keypress', (e) => {
		if(e.key === 'Enter'){
			const obj = {
				'body': chatInput.value,
				'reciever': user,
				'date': new Date()
			}
			chatInput.value = '';
			console.log('socket: message, ', obj);
			socket.emit('message', obj);
		}
	});
}
const initUsersDom = (users) => {
	chatDOM.parentNode.style.display  = 'none';
	usersDOM.style.display = '';

	//if a user is logged automatically init chat with dona
	if(users[0].username === 'donastavreva')
		initChatDom(users[0]);

	if(users.length == 1){
		const pClone = template.usersP.cloneNode(true);
		pClone.style.display = '';
		pClone.innerText     = users[0].username;
		pClone.onclick = () => {
			initChatDom(users[0]);
		}

		usersDOM.innerHTML = '';
		usersDOM.append(pClone);
	}
	else{
	/* use this for recieving multiple users (Only for Dona);
		const users_p = [];
		for(const i of users){
			const pClone = template.usersP.cloneNode(true);
			pClone.style.display = '';
			pClone.innerText     = i.username;
			users_p.push(pClone);
		}
		usersDOM.innerHTML = '';
		for(const i of users_p){
			usersDOM.append(i);
		}
	*/
	}
}
const initSocket = () => {
	socket = io('http://78.128.50.163:3000?token=' + localStorage['JWT']);
	socket.on('users', (users) => {
		console.log('initUsersDom');
		initUsersDom(users);
	});
}
