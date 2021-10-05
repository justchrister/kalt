

// Get all the elements.
var elements = document.getElementsByClassName("omoji");
// Iterate each.
for (var i = 0; i < elements.length; i++) {
    // Check if the text is found.
    if (elements[i].innerHTML.indexOf("😀") != -1 )
        // Replace the contents.
        elements[i].innerHTML = elements[i].innerHTML.replace('😀', '<span style="background-size:contain;color:transparent;background-repeat:no-repeat;background-image:url(https://cdn.kalt.co/media/emoticon/smile.svg);">😀</span>');
}
