//$("a").click(function () {
//  var v = $(this).attr("href");
//  event.preventDefault();
//  $("section").removeCLass("ive_been_jogging");
//  $(v).addClass("ive_been_jogging");
//});
$( document ).ready(function() {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
    $(".rn_time").html(time);
});
$('.js-tilt').tilt({
    reset: false
});
$(".k_io, .k_io:after").click(function () {
  // store the scroll pos like this on the object itself and pick it
  // up if the user wants to : $("this").data( "foo", $(document).scrollTop() );
  $(".index").toggleClass("open");
  $("body").toggleClass("k_iopen");
  $('html, body').animate({
      scrollTop: $("#upper").offset().top
  }, 500);
});
$("a").click(function () {
  var pag = $(this).attr("href");
  $(".active_section").removeClass("active_section");
  $(pag).addClass("active_section");
  $(".index").removeClass("open");
  $("body").removeClass("k_iopen");
});
$('.k_io, .companyname').hover(
       function(){ $("body").addClass('lol') },
       function(){ $("body").removeClass('lol') }
)
