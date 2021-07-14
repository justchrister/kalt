
// Store page

$("#store .more").click(function(){
  $(this).parent(".item").addClass("open");
  $("body").addClass("item-open");
  console.log("%c Kalt: Opened a product.", okStyle);
});

$(".item").data('price-level');




console.log();

$(document).ready(function() {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  $("body").addClass($.urlParameter('urlParameter'));
});

var options = {
  valueNames: [ 'title', 'byline' ]
};

var userList = new List('sortable', options);
