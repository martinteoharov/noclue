const btnToggleGod = document.getElementById('toggleGod');
const btnSavePage  = document.getElementById('savePageButton');
let godState = false; // get current god state by checking if btnToggleGod is editable
console.log(godState);

const getHTML = () => {
	console.log('getHTML:');
	return $('html').html();
}

const toggleGodMode = (bool) => {
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
	newNoty(notyType, str);
}
btnSavePage.onclick = () => {
	console.log('btnSavePage:');
	toggleGodMode(false);
	const HTML = getHTML();
	fetchPost('/saveHTML', {html: HTML}).then((res) => {
		console.log('/saveHTML:', res.status);
		newNoty('success', "index.html updated");
	});
}
btnToggleGod.onclick = () => toggleGodMode(!godState);

