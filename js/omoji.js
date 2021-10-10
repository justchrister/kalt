
const css = 'omoji { background-size:contain;color:transparent;background-repeat:no-repeat;}',
    	head = document.head || document.getElementsByTagName('head')[0],
    	style = document.createElement('style');

head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));

const omojis = [
	//["😃", "smile.svg"], commented out for the preview page
	["☺️", "happy.svg"],
	["😊", "happy.svg"],
	["🙂", "happy.svg"],
	["😃", "super-happy.svg"],
	["😄", "super-happy.svg"],
	["😁", "super-happy.svg"],
	["😀", "super-happy.svg"],
	["☹️", "sad.svg"],
	["🙁", "sad.svg"],
	["😟", "sad.svg"],
	["😒", "sad.svg"],
	["😞", "sad.svg"],
	["😔", "sad.svg"],
	["🙃", "ambivilant.svg"],
	["😦", "suprised.svg"],
	["😯", "suprised.svg"],
	["😧", "suprised.svg"],
	["😮", "suprised.svg"],
	["😲", "suprised.svg"],
];

for(var i = 0; i < omojis.length; i++) {
  const item = omojis[i];
	const emoji = new RegExp(item[0], "g");
	const omoji = '<omoji style="background-image:url(https://cdn.kalt.co/media/omoji/' + item[1] + ');">' + item[0] + '</omoji>';
	document.body.innerHTML = document.body.innerHTML.replace(emoji, omoji);
}
