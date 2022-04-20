// Copyright 2014-2015 Twitter, Inc.
// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}

let elem = document.getElementById("body");
document.onmousemove = function(event) {
    event.x;
    event.y;
    if (location.pathname == '/') {
        // Only be annoying on home page, defaults to runner
        const cursorTopHalf = event.y < (window.innerHeight/2)
        if(cursorTopHalf) {
          // do something with image classes
            elem.classList = ["emoji-cursor--astrocat"]
        } else {
            elem.classList = ["emoji-cursor--upside-down"]
        }
    }
}