const btnToggleGod = document.getElementById('toggleGod');
const btnSavePage  = document.getElementById('savePageButton');
let godState = false; // get current god state by checking if btnToggleGod is editable
console.log(godState);

const getHTML = () => {
	console.log('getHTML:');
	return $('html').html();
}

const toggleGodMode = (bool, notif) => {
	console.log(bool);
	let str;
	if(bool) 
		str = "Switch GOD to Off";
	else 
		str = "Switch GOD to On";
	btnToggleGod.innerText = str;


	const btnSavePage = document.getElementById('saveMessageButton');
	const paragraphs = document.getElementsByTagName('p');
	const divs       = document.getElementsByTagName('div');
	const concatMult = (_arr) => {
		let arr = [];
		for(const i of _arr){
			for(const m of i ){
				arr = arr.concat(m);
			}
		}
		return arr;
	}
	let headers = concatMult([document.getElementsByTagName('h1'),
		document.getElementsByTagName('h2'),
		document.getElementsByTagName('h3')]);

	for(const i of paragraphs){
		i.contentEditable = bool;
	}
	for(const i of headers){
		i.contentEditable = bool;
	}
	for(const i of divs){
		i.contentEditable = bool;
	}

	godState = bool;

	let notyType;
	bool ? notyType = 'error' : notyType = 'success';
	bool ? str = 'GOD Mode: ON' : str = 'GOD Mode: OFF';
	notif ? newNoty(notyType, str) : null;
}
btnSavePage.onclick = () => {
	console.log('btnSavePage:');
	godState ? toggleGodMode(false, 0) : null;
	const HTML = getHTML();
	fetchPostAuth('/users/saveHTML', {html: HTML}, localStorage['JWT']).then((res) => {
		console.log(res);
		if(res.success){
			console.log('/users/saveHTML:', res.status);
			newNoty('success', "index.html updated");
			newNoty('success', 'GOD Mode: OFF');
		}
		else
			newNoty('error', "You're not authorized to do that");
	});
}
btnToggleGod.onclick = () => {
	if(localStorage['JWT'])
		toggleGodMode(!godState, 1);
	else
		newNoty('error', "You're not authorized to do that");
}

