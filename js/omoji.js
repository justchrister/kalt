
const css = 'o { background-size:contain;color:transparent;background-repeat:no-repeat;}',
    	head = document.head || document.getElementsByTagName('head')[0],
    	style = document.createElement('style');

head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));

const omojis = [
	//["😃", "smile.svg"], commented out for the preview page
	["😄", "smile.svg"],
	["😁", "smile.svg"],
	["😀", "smile.svg"],
	["☺️", "smile.svg"],
	["😊", "smile.svg"],
	["🙂", "smile.svg"],
];

for(var i = 0; i < omojis.length; i++) {
    const item = omojis[i];
    for(var j = 0; j < item.length; j++) {
			const emoji = new RegExp(item[0], "g");
			const omoji = '<o style="background-image:url(https://cdn.kalt.co/media/emoticon/' + item[1] + ');">' + item[0] + '</o>';
			document.body.innerHTML = document.body.innerHTML.replace(emoji, omoji);
    }
}
