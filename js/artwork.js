
// Artwork page

$.urlParameter = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

$(document).ready(function() {
	var artid = $.urlParameter("id");

	console.log("Loading " + artid);
	// Get the coresponding artwork object in the artworks array.
	var artwork = artworks.find(obj => {
	  return obj.artid === artid;
	});

	$("#artid").html(artwork.artid);
	$("h2").html(artwork.title);
	$('.image').css('background-image', 'url(' + artwork.image + ')');
	$('.byline').html(artwork.byline);
	$('.description').html(artwork.description);


	// show the site after content has loaded
	$('body').css('opacity', '1');

 });
