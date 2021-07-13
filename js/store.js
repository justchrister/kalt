
// Store page

$("#store .more").click(function(){
  $(this).parent(".item").addClass("open");
  $("body").addClass("item-open");
  console.log("%c Kalt: Opened a product.", okStyle);
});
