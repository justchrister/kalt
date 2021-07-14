
// Store page

$("#store .more").click(function(){
  $(this).parent(".item").addClass("open");
  $("body").addClass("item-open");
  console.log("%c Kalt: Opened a product.", okStyle);
});

$(".item").data('price-level');


$(document).ready(function() {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  $("body").addClass($.urlParameter('urlParameter'));
});
