const okStyle = [
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

$(".menu ul li a").click(function(){
  $("body").toggleClass("show-menu");
  console.log("%c Kalt: Toggled menu.", okStyle);
});
$(".menu button").click(function(){
	event.preventDefault();
  $("body").toggleClass("show-menu");
  console.log("%c Kalt: Toggled menu.", okStyle);
});

// Build the menu

$(function () {
    var data = {
        menu: [{
            name: 'Artworks',
            link: 'https://kalt.co/art' },
            {
            name: 'Documents',
            link: 'https://kalt.co/📄' },
            {
            name: 'Omoji',
            link: 'https://kalt.co/📄/omoji.html' },
            {
            name: 'Contact',
            link: 'mailto:hello@kalt.co'
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

// set a cookie, lool
document.cookie = "cookie!";
