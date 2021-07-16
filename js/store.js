
// Store page

$("#store .more").click(function(){
  $(this).parent(".item").addClass("open");
  $("body").addClass("item-open");
  console.log("%c Kalt: Opened a product.", okStyle);
});

$(".item").data('price-level');


$.urlParameter = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}


const artworks =
			[{
				artid: '2993',
				title: 'Untitled (History of the Black People)' },
				{
				name: '2995',
				link: 'Untitled'
		}]
};

$(document).ready(function() {
	var artid = $.urlParameter("id");
	console.log(artid);
	$("#artid").html(artid);
 });
