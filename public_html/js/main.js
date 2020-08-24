$( document ).ready(function() {
    document.title = 'コールド | Kalt - Making dope doper.';
});
$("#values article").click(function () {
  $(this).toggleClass("toggled");
});
$(".index-btn").click(function () {
  $(".index").toggleClass("toggled");
});
$(".index a").click(function () {
  $(".index").toggleClass("toggled");
});
$('.index-btn, .companyname').hover(
       function(){
         $("body").addClass('lol')
         document.title = ' ಠ_ಠ ';
       },
       function(){
         $("body").removeClass('lol')
         document.title = 'コールド | Kalt - Making dope doper.';
       }
)
