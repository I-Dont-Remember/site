+++
categories = ["TIL"]
date = 2022-04-19T05:00:00Z
description = "Emoji cursors changing based on position? Oh my."
draft = false
images = []
tags = ["CSS","JS", "cursors"]
title = "How to be Annoying with CSS Cursors (and a sprinkle of JS)"
+++

Looking for a new way to annoy[^1] your website visitors? Of course you are! How about changing their cursors to an emoji -- and we won't stop there.
 We'll make that emoji change based on where they are on the page, wild stuff🤪!


## Why

Thanks to the [wonderful CSS tips](https://markodenic.com/css-tips/) a friend unwittingly sent me, I was forced by the hands of fate to adopt the emoji cursor on my own site.
If you don't like it, you'll have to take it up with them.

## How can I do this too ???

The most important bit is adding classes you can easily reference with the emoji cursor changes. Feel free to choose whatever 🖼 suits your fancy.

```
.emoji-cursor--default {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🏃‍♂️</text></svg>"), auto;
}

.emoji-cursor--astrocat {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🐱‍🚀</text></svg>"), auto;
}

.emoji-cursor--upside-down {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🙃</text></svg>"), auto;    
}
```

To make it change based on position, it's a simple little function added in one of your `js` files:

```
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
```

And the last piece since I got lazy and wanted to just use an `id`, though you could definitely do it cleaner by making the `elem` lookup go find `body` without it:

```
...
<body id="body" class="emoji-cursor--default">
...
```

## That's it

Now you have everything necessary in your toolkit to ensure your visitors leave more perplexed than they came.

[^1]: _Of course you are, what a dumb questions._