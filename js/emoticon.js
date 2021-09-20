
$("*:contains(':-\)')").html(function(_, html) {
	return html.replace(/(:-\))/g, '<span data-emoticon="smile">$1</span>');
});
