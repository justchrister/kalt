
$("button").click(function(){
  $(location).attr('href', $(this).find('a').attr('href'));
});

$(".menu button").click(function(){
  $("body").toggleClass("show-menu");
});

$(".menu ul li a").click(function(){
  $("body").toggleClass("show-menu");
});

$('.js-tilt').tilt({
    reset: false
})
