// Using this technique allows users to still copy text *with* emojis.

const css = 'omoji { background-size:contain;color:transparent;background-repeat:no-repeat;}',
    		head = document.head || document.getElementsByTagName('head')[0],
    		style = document.createElement('style');

head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));

const omojis = [
	// Happy
	["☺️", "happy.svg"],
	["😊", "happy.svg"],
	["🙂", "happy.svg"],
	// Super-happy
	["😃", "super-happy.svg"],
	["😄", "super-happy.svg"],
	["😁", "super-happy.svg"],
	["😆", "super-happy.svg"],
	["😀", "super-happy.svg"],
	// Sad
	["☹️", "sad.svg"],
	["🙁", "sad.svg"],
	["😟", "sad.svg"],
	["😒", "sad.svg"],
	["😞", "sad.svg"],
	["😔", "sad.svg"],

	// ambivalent
	["🙃", "ambivilant.svg"],

	// Suprised
	["😦", "suprised.svg"],
	["😯", "suprised.svg"],
	["😧", "suprised.svg"],
	["😮", "suprised.svg"],
	["😲", "suprised.svg"],
];

for(var i = 0; i < omojis.length; i++) {
	const item = omojis[i];
	const emoji = new RegExp(item[0], "g");
	const omoji = '<omoji style="background-image:url(../images/omoji/' + item[1] + ');">' + item[0] + '</omoji>';
	document.body.innerHTML = document.body.innerHTML.replace(emoji, omoji);
};