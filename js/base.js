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
// First we detect the click event
document.getElementsByTagName('code').addEventListener('click', function () {
	  // Using an if statement to check the class
  if (this.classList.contains('show-code')) {
    // If show-code is present; dont do anything.
  } else {
		// If its missing; add it.
		this.classList.add('show-code');
  }
});

// Build the menu

$(function () {
    var data = {
        menu: [{
            name: 'Artworks',
            link: '/art' },
            {
            name: 'Documents',
            link: '/📄' },
            {
            name: 'Omoji',
            link: '📄/omoji.html' },
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
