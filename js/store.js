
$("#store .more").click(function(){
  $(this).parent(".item").addClass("open");
  console.log("%c Kalt: Opened a product.", okStyle);
});
