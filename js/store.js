
// Store page

$("#store .more").click(function(){
  $(this).parent(".item").addClass("open");
  $("body").addClass("item-open");
  console.log("%c Kalt: Opened a product.", okStyle);
});



// Build the menu

$(function () {

    var products = {
        art: [{
            name: 'Memphis',
            by: 'Basquiat',
            by: 'store.html'
        }]
    };
    var getMenuItem = function (itemProducts) {
        var item = $("<div>")
            .append(
        $("<h2>", {
            href: itemProducts.name
        }));
        return item;
    };

    var $art = $("#store");
    $.each(data.art, function () {
        $art.append(
            getMenuItem(this)
        );
    });
    $art.art();
});






const artworks = [
  {
    title: "Old Man's War",
    byline: "Jean-Michael Basquiat",
    byline: "Jean-Michael Basquiat",
  },
  {
    title: 'The Lock Artist',
    author: {
      firstName: 'Steve',
      lastName: 'Hamilton'
    }
  }
]
