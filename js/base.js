let okStyle = [
  "color: #FF0"
].join(";");

$(".menu button").click(function(){
  $("body").toggleClass("show-menu");
  console.log("%c Kalt: Toggled menu.", okStyle);
});

$(".menu ul li a").click(function(){
  $("body").toggleClass("show-menu");
  console.log("%c Kalt: Toggled menu.", okStyle);
});

$("code").click(function(){
  $(this).addClass("show-code");
});
console.log("");
console.log("%c                          (                          ", okStyle)
console.log("%c              .            )        )                ", okStyle)
console.log("%c                        (  (|              .         ", okStyle)
console.log("%c                   )   )\\/ ( ( (                     ", okStyle)
console.log("%c           *  (   ((  /     ))\\))  (  )    )         ", okStyle)
console.log("%c         (     \\   )\\(          |  ))( )  (|         ", okStyle)
console.log("%c        >)     ))/   |          )/  \\((  ) \\ \\        ", okStyle)
console.log("");
console.log("%c                       kalt.co                       ", okStyle)
console.log("");




// Build the menu

$(function () {

    var data = {
        menu: [{
            name: 'About',
            link: 'about.html'},
            {
            name: 'Documents',
            link: 'documents.html' },
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
