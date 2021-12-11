+++
categories = ["Guides"]
date = 2021-12-10T05:00:00Z
description = "Configure Obsidian for seamless daily notes by adding the Periodic Notes, Templater, and Calendar community plugins."
draft = false
images = []
tags = ["obsidian"]
title = "Get Started With Obsidian Periodic Notes and Templater"
toc = true
+++
I've enjoyed tracking my daily notes in Obsidian so far, but it was a bit more complicated to get configured than I thought it would be, so I'm sharing it here to hopefully make setup smoother for those in the future - as well as a few extra credit pieces I've picked up along the way.

## Daily Notes Steps

1. Create a folder for the periodic notes (`periodic_notes`), and then a sub folder for each of the time periods you want to use, .e.g `periodic_notes/daily`. You can choose whatever naming scheme you like.
2. Create a folder for Templates, then a base template file for each period you will be using. Naming doesn't matter for this, I chose the creative `Templates`.
3. [Enable community plugins](https://help.obsidian.md/Advanced+topics/Community+plugins) and install Calendar, Periodic Notes, and Templater.
4. Open settings and enable all the plugins.
5. Open the sub-settings for Periodic Notes and enable all the time periods you will use. Feel free to adjust any of the file naming conventions, for me, I updated the weekly format to `gggg-[W]WW` to match my navigation bar template.

```
 ⚠️ Don't set templates in the Periodic Notes settings. They will be configured with Templater since it has more features.
```

6. Open the Templater sub-settings, then set your `Template folder location` to what you created in Step 2.
7. Enable `Trigger Templater on new file creation`.
8. Under `Folder Templates`**,** connect each of the periodic folders you created in Step 1 to the base template files from Step 2.

Now, whenever a new file is created in any of those folders, it will run Templater first. The Calendar sidebar is a handy tool for easily selecting any day's file vs the Command Palette/File search .

## Extra Credit

### Navigation Bar

It's a bit overkill, but I originally saw this on the [Obsidian Reddit](https://www.reddit.com/r/ObsidianMD/comments/my4ns4/planning_for_the_week_ahead_in_obsidian/) and loved the idea of easily accessing not just the adjacent days, since Calendar plugin does that, but the other periods relevant for that day as well. Looks like this:

`❮❮ ⋮ 2021 › 12 › Q4 › W49 ⋮ ❯❯`

```
 ℹ️ It's possible to have a similar navbar on other periods besides 'daily', though it does cause more difficulties since you aren't pulling the exact day from the title. What date should it pick if you're looking at 2022-Q2? Doable, but it's an exercise left to the reader.
```

Want your own? This relies on your files having the date in the name, so as long as you are using Periodic Notes plugin and match up your chosen format setting with this code, you'll be ready to rock. The section in the frontmatter sets up a number of variables, then later on the page I can access them.

    ---
    <%*
    var fileDate = moment(tp.file.title);
    // moment dates are mutable
    let prevDay = moment(fileDate).subtract(1, 'd').format('YYYY-MM-DD');
    let nextDay = moment(fileDate).add(1, 'd').format('YYYY-MM-DD');
    let yearLink = fileDate.format('YYYY');
    let quarterLink = fileDate.format('YYYY-[Q]Q');
    let monthLink = fileDate.format('YYYY-MM');
    let weekLink = fileDate.format('gggg-[W]WW');
    -%>
    tags: daily_note <% fileDate.format("YYYYMMDD") %> <% weekLink %> <% monthLink %> <% quarterLink %> <% yearLink %>
    weekday: <% fileDate.format("ddd") %>
    ---
    
    <%*
    // ❮❮ ⋮ 2021 › Q4 › 12 › W49 ⋮ ❯❯
    // [[path/to/file|display_text]]
    let navStr = `[[periodic_notes/daily/${prevDay}|❮❮]] ⋮ [[periodic_notes/yearly/${yearLink}|${yearLink}]] › [[periodic_notes/quarterly/${quarterLink}|${fileDate.format('[Q]Q')}]] › [[periodic_notes/monthly/${monthLink}|${fileDate.format('MM')}]] › [[periodic_notes/weekly/${weekLink}|${fileDate.format('[W]WW')}]] ⋮ [[periodic_notes/daily/${nextDay}|❯❯]]`;
    tR += navStr
    %>
    

### Completion Percentage

I'm a visual person, so it's very handy for me to be able to see how far through the week/month/year I currently am. Can't pretend you have plenty of time left if the ticker says 95% finished.

    Month: [██████████◽◽◽◽◽◽◽◽◽◽◽◽◽◽◽◽◽◽◽◽◽] 32% ( 10/31 )
    Year: [███████████████████████████████◽◽] 94% ( 344/365 )
    
    # Alternative
    ⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡⊡·········31|
    

Since I use the progress bar in a number of places, I have it stored as a Templater user function. To use mine specifically (else just copy the `function` in any Templater block you want it):

1. create a folder in the vault for functions, then edit Templater settings to point to it.
2. Create a `makeProgressBar.js` file in that folder and fill it with contents below.

       function makeProgressBar(numerator, denominator, size = 50, filledChar = "█", unFilledChar = "◽", label="") {
           let percentage = numerator / denominator;
           let maxBlocks = size;
           let numFilled = Math.floor(percentage*maxBlocks)
           return `${label}: [${filledChar.repeat(numFilled)}${unFilledChar.repeat(maxBlocks-numFilled)}] ${Math.floor(percentage*100)}% ( ${numerator}/${denominator} )`
       }
       
       module.exports = makeProgressBar;
       
3. Restart Obsidian, in the settings for Templater you should see it loaded your function.
4. Now you can use it in your Daily Notes (or elsewhere) like so:

       <%* 
       function month() {
           let fileDateNum = fileDate.date();
           let numDays = fileDate.daysInMonth();
           // ignore leapyears
           tR += tp.user.makeProgressBar(fileDateNum, numDays, size=numDays, filledChar = "█", unFilledChar = "◽", label="Month");
       }
       month();
       -%>
       
       <%* 
       function year() {
           let dayNum = fileDate.dayOfYear();
           // ignore leapyears
           tR += tp.user.makeProgressBar(dayNum, 365, size=33,filledChar = "█", unFilledChar = "◽", label="Year");
       }
       year();
       %>
       
       # Blah Regular Content
       This is regular content to show you you can place the progress bars wherever.
       

### Other Plugins

If you're interested in gleaning insights from Daily Notes over time, e.g. habit summaries in each Weekly Note, average number of hours you worked per day, pulling in summaries of tasks across many files, then I highly recommend adding the plugins [Dataview](https://blacksmithgu.github.io/obsidian-dataview) and [Tracker](https://github.com/pyrochlore/obsidian-tracker). I have barely dipped my toes into what they can do and can already see huge potential to get a better understanding of my moods, habits, and more. There's some great Dataview inspiration on the [Obsidian forum](https://forum.obsidian.md/t/dataview-plugin-snippet-showcase/13673/190).

## Fin

You should be all set with a basic configuration for taking Periodic Notes in Obsidian with Templater, though now that you have such a powerful tool, the sky is the limit. Get creative with daily rituals, morning routines, and the many community plugins available in Obsidian. If you have any questions or responses, feel free to reach out to me on [Twitter](https://twitter.com/maybekq).