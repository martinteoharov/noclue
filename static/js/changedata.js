const btnSavePage = document.getElementById('saveMessageButton');
const paragraphs = document.getElementsByTagName('p');
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
	i.contentEditable = true;
}
for(const i of headers){
	i.contentEditable = true;
}


const getHTML = () => {
	console.log('getHTML:');
	return $('html').html();
}

btnSavePage.onclick = () => {
	console.log('btnSavePage:');
	const HTML = getHTML();
	fetchPost('/saveHTML', {html: HTML}).then((res) => {
		console.log('/saveHTML:', res.status);
		newNoty('success', "index.html updated");
	});
}
