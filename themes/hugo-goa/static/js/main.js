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