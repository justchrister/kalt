let okStyle = [
  "color: #FF0"
].join(";");

console.log("");
console.log("%c                          (                              ", okStyle)
console.log("%c              .            )        )                    ", okStyle)
console.log("%c                        (  (|              .             ", okStyle)
console.log("%c                   )   )\\/ ( ( (                        ", okStyle)
console.log("%c           *  (   ((  /     ))\\))  (  )    )            ", okStyle)
console.log("%c         (     \\   )\\(          |  ))( )  (|           ", okStyle)
console.log("%c        >)     ))/   |          )/  \\((  ) \\ \\        ", okStyle)
console.log("");
console.log("%c                       kalt.co                           ", okStyle)
console.log("");

$(".menu button, .menu ul li a").click(function(){
  $("body").toggleClass("show-menu");
  console.log("%c Kalt: Toggled menu.", okStyle);
});

$("code").click(function(){
  $(this).addClass("show-code");
});




// Build the menu

$(function () {
    var data = {
        menu: [{
            name: 'Artworks',
            link: '/art' },
            {
            name: 'Omoji',
            link: '/omoji' },
            {
            name: 'Contact',
            link: 'mailto:christer@kalt.co'
        }]
    };
    var getMenuItem = function (itemData) {
        var item = $("<li>")
            .append(
        $("<a>", {
            href: itemData.link,
            html: itemData.name
        }));
        return item;
    };

    var $menu = $(".menu ul");
    $.each(data.menu, function () {
        $menu.append(
            getMenuItem(this)
        );
    });
});

// Add _blank target to all external links
$('a[href^="http://"]').not('a[href*=kalt.co]').attr('target','_blank');
$('a[href^="https://"]').not('a[href*=kalt.co]').attr('target','_blank');

// Add nofollow rel to all external links
$('a[href^="http://"]').not('a[href*=kalt.co]').attr('rel','nofollow');
$('a[href^="https://"]').not('a[href*=kalt.co]').attr('rel','nofollow');


// set a cookie, lool
document.cookie = "cookie!";
