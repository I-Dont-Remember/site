+++
categories = ["TIL"]
date = 2022-01-20T05:00:00Z
description = ""
draft = false
images = []
tags = []
title = "Convert Python Dict to JSON on the Command Line With Sed"
+++

Plenty of times I've run into logging Python `dict` and needing to convert them to JSON for whatever reason. Have run into this across numerous projects and working with a variety of people who have stumbled into the same issue.

What needs to change exactly?

```
" -> \"
' -> "
True -> true
False -> false
None -> null
```

## Convert Python dict to JSON with sed

1. Save your data into `file.txt`.

2. `sed` it up.
    ```
    echo -e "\n" && sed 's/"/\\"/g;  s/'\''/\"/g; s/True/true/g; s/False/false/g; s/None/null/g' file.txt && echo -e "\n"
    ```

If you'd prefer to have the json in a file:
    ```
    sed 's/"/\\"/g;  s/'\''/\"/g; s/True/true/g; s/False/false/g; s/None/null/g' file.txt > file.json
    ```

A common question after this would be "Can I have it automatically get filled without copying?" - yes you can! [A thread on how to send stdout to clipboard](https://unix.stackexchange.com/questions/3892/how-do-i-send-stdout-to-the-clipboard). Takeway:

- Linux - you'll need to install a utility for it.
- Mac - you have `pbcopy` and `pbpaste` built in.

In the future it would be nice to be able to paste directly and pipe through `sed` and have the output end up back in my clipboard, but that will have to wait for another day.






