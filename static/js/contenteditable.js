const btnToggleGod = document.getElementById('toggleGod');
const btnSavePage  = document.getElementById('savePageButton');
let godState = false; // get current god state by checking if btnToggleGod is editable
let savingState = 0; // 0 - not saving currently, 1 - saving is initiated

const getHTML = () => {
	return $('html').html();
}
const savePage = (HTML) => {
	fetchPostAuth('/users/saveHTML', {html: HTML}, localStorage['JWT']).then((res) => {
		if(res.success){
			newNoty('success', res.message);
			newNoty('success', 'GOD Mode: OFF');
		}
		else
			newNoty('error', res.message);

		savingState = 0;
	});
}

const toggleGodMode = (bool) => {
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

	const editable = [paragraphs, headers, divs];
	for(const m of editable){
		for(const i of m){
			i.contentEditable = bool;

		}
	}

	godState = bool;
	if(godState)
		newNoty('warning', 'GOD Mode: ON')
	else
		newNoty('success', 'GOD Mode: OFF')
}
btnSavePage.onclick = () => {
	if(savingState == 0){
		toggleGodMode(false);
		deleteAllNoty();
		savingState = 1;
		setTimeout(() => savePage(getHTML()), 3000);
	}
}
btnToggleGod.onclick = () => {
	if(localStorage['JWT'])
		toggleGodMode(!godState);
	else
		newNoty('error', "You're not authorized to do that");
}

