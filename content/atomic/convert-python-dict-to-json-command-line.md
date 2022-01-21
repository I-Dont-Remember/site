+++
categories = ["Atomic"]
date = 2022-01-20T05:00:00Z
description = ""
draft = false
images = []
tags = []
title = "Convert Python Dict to JSON on the Command Line"
+++

Plenty of times I've run into logging Python `dict` and needing to convert them to JSON for whatever reason. Have run into this across numerous projects and working with a variety of people who have stumbled into the same issue.

## Convert Python dict to JSON with sed

1. Save your data into `file.json`.

2. `sed` it up.
    ```
    sed 's/'\''/\"/g; s/True/true/g; s/False/false;g; s/None/null/g' file.txt > file.json
    ```

Improving for the future? Would love to paste the data after copying it and pipe it through rather than having the intermediate file steps.
