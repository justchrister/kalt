function createArtwork(artworkData) {
  var artworkTemplate = [
		'<div class="item">',
		'<div class="image" style="background-image:url(',
		artworkData.image,
	  ');"></div>',
		'<div class="body">',
		'<h2>',
		artworkData.title,
		'</h2>',
		'<p class="byline">',
		artworkData.byline,
		'</p>',
		'</div>',
		'<button class="more">',
		'<a href="artwork.html?id=',
		artworkData.artid,
		'">',
		'300 000 /nok',
		'</a>',
		'</button>',
		'</div>'
  ];

  // a jQuery node
  return $(artworkTemplate.join(''));
}

var items = $();
// Store all the card nodes
artworks.forEach(function(item, i) {
  items = items.add(createArtwork(item));
});

// Add them to the page... for instance the <body>
$(function() {
  $('.grid#store').append(items);
});
