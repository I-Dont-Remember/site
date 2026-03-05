
/**Change mouse cursor depending on which part of the page you're on */
let elem = document.getElementById("body");
document.onmousemove = function(event) {
    event.x;
    event.y;
    if (location.pathname == '/') {
        // Only be annoying on home page, defaults to runner
        const cursorTopSection = event.y < (window.innerHeight/1.5)
        if(cursorTopSection) {
          // do something with image classes
            elem.classList = ["emoji-cursor--page-top"]
        } else {
            elem.classList = ["emoji-cursor--page-bottom"]
        }
    }
}