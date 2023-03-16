+++
categories = ["TIL"]
date = 2023-03-16T05:00:00Z
description = "I like using Dex CRM, but I also want to know if anything ever happens to their company, I have an open-source way to still use my contacts information."
draft = true
images = []
tags = ["personal-crm", "dex", "nocodb", "airtable", "sqlite", "open-source"]
title = "My Backup Plan if Dex CRM Goes Kaput"

+++
I like using Dex as my personal CRM - their workflows are fast, intuitive, and their support team responds really quickly if you need help. That said, nothing is guaranteed in life, so if anything ever happens to their company, I don't want to lose all my contact information along with it. We need a **Super Backup Plan**™️.

## My Backup Plan for Dex CRM

Dex is kind enough to make exporting your contacts data super easy, so we don't have to do any crazy scraping hullabaloo to get what we need. My plan is real simple (harder to mess up that way!):

1. **Export my data from Dex** 
   * Login to Dex, then go to the [Settings->Export page](https://getdex.com/appv3/settings/export). Download both of the files available.
2. **Upload the two CSVs _(Notes & Contacts)_ into Nocodb/Airtable**
   * Both Airtable and Nocodb [_(self-hostable, open-source Airtable alternative)_](/blog/how-to-self-host-nocodb-on-fly.io/) have options that let you import a CSV file as a new Table.
   * On import it will ask you to choose the different field types to match Nocodb/Airtable types - ones I've already figured out and you can copy are:
     **Contacts**
      ```
      GroupMembership - should be multi-select, their delimiter is ` ::: `. There are also individual columns, Group1, Group2,...etc.
      LastSeenAt - DateTime
      LastReminderAt - DateTime
      NextReminderAt - DateTime
      ```

      **Notes**
      ```
      EventTime - DateTime
      ```


### Caveats & Notes

- Contact photos are on a CDN  - you'll need to come up with an alternative place to host/save them, if that's worth your effort.
- Attempting to tie the `Notes` table with the `Contacts`
  - Looks like the [`Link to Another Record`](https://docs.nocodb.com/setup-and-usages/link-to-another-record) one-to-many is a good fit for a column tieing the two tables together, but have not figured out yet how to run them all automatically.

### Final Result

Both of the new tables thriving in my self-hosted NocoDB instance - this is just a Proof of Concept to make sure the idea works, so not worried about reliability for now.
![](/uploads/dex-data-in-nocodb.jpg)

### Another Alternative

If I had no desire for a web based tool, there's always loading the data into a SQLite DB - then I can query whatever my heart desires against it.
I don't have any complex needs other than easy access for editing _(otherwise I won't keep it up to date!)_ so this is more of a _"if the mood strikes me"_ idea.

## Personal CRMs: why/how

- [Reddit post does decent explanation of the benefit/why](
https://www.reddit.com/r/Lightbulb/comments/9cy86j/a_personal_crm_app_that_helps_you_remember/)
- [Nat Eliason runs his in Airtable for simplicity](
https://www.nateliason.com/blog/personal-crm)
- An example of a person who has [configured Airtable to act as a quasi-Dex with reminders to reach out](https://jakobgreenfeld.com/stay-in-touch). I'll just use Dex for now and keep this as a backup plan.