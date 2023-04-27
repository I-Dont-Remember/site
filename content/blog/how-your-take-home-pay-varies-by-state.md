+++
categories = [ "Career" ]
date = 2022-10-04T05:00:00.000Z
description = "Given a remote worker allowed to live in any state, how does their tax burden vary if they move?"
draft = false
images = [ ]
tags = [ "data" ]
title = "How Your Take-home Pay Varies By State"
toc = true
_template = "blog_post"
+++


I had a vague understanding that different states had different levels of taxes _(wow Florida with that no-income tax woot woot!)_, but never went deeper. The rise of remote work in the last couple years brought this question into sharper focus:

**Given a remote worker allowed to live in any state, with salary not adjusted, how does their tax burden vary?**

{{< bootstrap-panel title="Cost of living" >}}
_This analysis does not take into account cost of living - this is purely based on my chosen scenario with no regard for housing, job market opportunities, etc._
{{< /bootstrap-panel >}}

## The data

I found a [handy online calculator](https://www.talent.com/tax-calculator?salary=50000&from=year&region=Illinois) for the base data, ran it for a variety of salaries, then did some simple calcs on the aggregate across states & salary buckets.

Buckets I chose:

- $50k, $75k, $100k, $125k - _(then for giggles & Silicon Valley folks)_ - $150k, $200k, $250k, $300k.

> [ℹ️] _If you want to dive deeper into the data for your exact salary, I highly recommend checking out that calculator, because they also provide extra information, like how much a marginal salary increase will net you. Example: `For instance, an increase of $100 in your salary will be taxed $25.15, hence, your net pay will only increase by $74.85.`[src](https://www.talent.com/tax-calculator?salary=50000&from=year&region=Illinois)._


## Best & worst states, per salary bucket

This table goes through and compares the best & worst amounts of take-home pay for each of the salary buckets. My personal takeaways:

- I thought the difference between best & worst would be higher, but it's fairly consistent around **8%** of your base salary. Guess that's the Federal taxes keeping things level.
- If I made `$75k` base salary in Hawaii and then moved to Florida, I'd have an extra `$5,659.00` to spend on plastic trinkets from Amazon. **Wild!**
- If you aren't moving highest taxes to lowest, but highest to mid tier, that number drops to median of `$3,335.00`. A couple grand ain't nothing, but that's in best case scenario of highest taxes to average - which won't be a lot of people. I haven't done the calculations for averaging the difference between every combination of states, but it would likely be `$2-4k`.
  - I had originally hypothesized it would be a no-brainer to move for a free & sizable _"bonus"_ to your salary. Looks like it's not so cut-and-dry, especially considering moving can be an expensive endeavor on it's own.

{{< bootstrap-table "table table-dark table-striped table-bordered" >}}
| salary bucket | best        | worst       | best\_pct | worst\_pct | best\_state | worst\_state | diff $     | diff\_pct\_of\_base\_pay | median $    | median diff $ | mean $      |
| ------------- | ----------- | ----------- | --------- | ---------- | ----------- | ------------ | ---------- | ------------------------ | ----------- | ------------- | ----------- |
| 50k           | $41,935.00  | $38,313.00  | 16.10%    | 23.40%     | Florida     | Hawaii       | $3,622.00  | 7.24%                    | $39,842.00  | $2,093.00     | $40,129.00  |
| 75k           | $59,995.00  | $54,336.00  | 20.00%    | 27.60%     | Florida     | Hawaii       | $5,659.00  | 7.55%                    | $56,660.00  | $3,335.00     | $57,063.86  |
| 100k          | $77,582.00  | $69,819.00  | 22.40%    | 30.20%     | Florida     | Oregon       | $7,763.00  | 7.76%                    | $72,946.00  | $4,636.00     | $73,473.90  |
| 125k          | $94,710.00  | $84,336.00  | 24.20%    | 32.50%     | Florida     | California   | $10,374.00 | 8.30%                    | $88,827.00  | $5,883.00     | $89,406.49  |
| 150k          | $111,984.00 | $98,902.00  | 25.30%    | 34.10%     | Florida     | Oregon       | $13,082.00 | 8.72%                    | $104,797.00 | $7,187.00     | $105,466.33 |
| 200k          | $147,899.00 | $129,626.00 | 26.10%    | 35.20%     | Florida     | California   | $18,273.00 | 9.14%                    | $137,999.00 | $9,900.00     | $138,976.90 |
| 250k          | $179,657.00 | $156,269.00 | 28.10%    | 37.50%     | Florida     | California   | $23,388.00 | 9.36%                    | $167,282.00 | $12,375.00    | $168,291.27 |
| 300k          | $211,416.00 | $182,913.00 | 29.50%    | 39.00%     | Florida     | California   | $28,503.00 | 9.50%                    | $196,387.00 | $15,029.00    | $197,606.22 |
{{< /bootstrap-table >}}

---

## Range of rankings, per state

I was then curious about how states vary in ranking as income increases. My personal takeaways:

- Vermont (`28`), New Jersey (`25`), and California (`22`) had the largest change in ranking across the 8 salary buckets. Seems like those are states that are pretty decent to be in at _"common"_ salary bands, but if you're crazy rich the taxes are giving you a hard time.
- The top 10 states didn't budge at all - this makes sense as [8 of them don't have state income tax, and NH doesn't tax earned wages](https://www.investopedia.com/financial-edge/0210/7-states-with-no-income-tax.aspx). North Dakota holds it spot by having it at [<3% even if you make $500k/year](https://www.tax-rates.org/north_dakota/income-tax).
  > ⚠️ _It was mentioned to me that Washington has some FMLA Tax that doesn't technically count as state tax, but which should end up demoting it on this list. I couldn't find any specific % numbers to include, but if you have more info I'd appreciate if you reached out!_
- Median change was `5` places - which to me feels like a fairly consistent set of rankings. I have no stats background, so just nod along if that's wildly innacurate 😅.

{{< bootstrap-table "table table-dark table-striped table-bordered" >}}
|                | Lowest | Highest | Diff |
| -------------- | ------ | ------- | ---- |
| Florida        | 1      | 1       | 0    |
| Nevada         | 2      | 2       | 0    |
| New Hampshire  | 3      | 3       | 0    |
| South Dakota   | 4      | 4       | 0    |
| Tennessee      | 5      | 5       | 0    |
| Texas          | 6      | 6       | 0    |
| Wyoming        | 7      | 7       | 0    |
| Alaska         | 8      | 8       | 0    |
| Washington     | 9      | 9       | 0    |
| North Dakota   | 10     | 10      | 0    |
| New Jersey     | 11     | 36      | 25   |
| Ohio           | 12     | 17      | 5    |
| Arizona        | 11     | 13      | 2    |
| Louisiana      | 14     | 16      | 2    |
| Pennsylvania   | 12     | 15      | 3    |
| Indiana        | 13     | 16      | 3    |
| Vermont        | 17     | 45      | 28   |
| Arkansas       | 18     | 34      | 16   |
| Missouri       | 19     | 26      | 7    |
| New Mexico     | 20     | 25      | 5    |
| North Carolina | 21     | 24      | 3    |
| Oklahoma       | 19     | 22      | 3    |
| Rhode Island   | 17     | 27      | 10   |
| Alabama        | 14     | 24      | 10   |
| Colorado       | 18     | 25      | 7    |
| Iowa           | 26     | 36      | 10   |
| Mississippi    | 20     | 27      | 7    |
| Michigan       | 16     | 28      | 12   |
| California     | 29     | 51      | 22   |
| Delaware       | 30     | 38      | 8    |
| Idaho          | 31     | 40      | 9    |
| Kansas         | 30     | 33      | 3    |
| West Virginia  | 33     | 40      | 7    |
| Wisconsin      | 30     | 34      | 4    |
| Maryland       | 24     | 35      | 11   |
| Virginia       | 34     | 39      | 5    |
| Georgia        | 33     | 37      | 4    |
| Kentucky       | 23     | 38      | 15   |
| Nebraska       | 39     | 43      | 4    |
| Illinois       | 22     | 40      | 18   |
| Maine          | 41     | 46      | 5    |
| Utah           | 26     | 42      | 16   |
| Massachusetts  | 29     | 43      | 14   |
| Montana        | 39     | 44      | 5    |
| New York       | 42     | 46      | 4    |
| Minnesota      | 44     | 49      | 5    |
| Washington DC  | 47     | 49      | 2    |
| South Carolina | 42     | 48      | 6    |
| Connecticut    | 43     | 49      | 6    |
| Oregon         | 50     | 51      | 1    |
| Hawaii         | 47     | 51      | 4    |
{{< /bootstrap-table >}}

## Fin

Want to play with the data yourself? Make a copy of the [Google Sheet source](https://docs.google.com/spreadsheets/d/1FXdE3UxdSSHQHD8DNI5BAy_XgbnEfwgZ9zB0UZIhGr0/edit?usp=sharing) and go wild! Questions? ideas? Let me know what you come up with on [Twitter](https://twitter.com/maybekq).
