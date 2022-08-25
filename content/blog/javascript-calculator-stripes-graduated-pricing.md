+++
categories = ["Software Development"]
date = 2022-08-25T05:00:00Z
description = "Tired of hand calculating the total cost for your graduated pricing tier in Stripe? Me, too!"
images = [""]
tags = ["developers"]
title = "Write a Javascript Cost Calculator for Stripe's Graduated Pricing"
+++

Calculating the total cost of a graduated pricing scheme is a PITA if you have to do it more than once - and Stripe's `Price` dashboard unfortunately doesn't have any tooling to help you. Instead of doing it by hand every time, let's write a Javascript calculator to do it for us.

## Why

Plenty of reasons you'd want to test out potential pricing scenarios before they actually happen - getting quotes for prospective customers, comparison with competitors, checking the impact of discount codes, etc. There's a reason sites exist like [Serverless Cost Calculator for AWS](http://serverlesscalc.com/).

## Wait, what is graduated pricing

Stripe offers a [graduated pricing model](https://stripe.com/docs/products-prices/pricing-models#graduated-pricing) under [Usage-based Billing](https://stripe.com/docs/billing/subscriptions/usage-based), e.g.:

{{< bootstrap-table "table table-dark table-striped table-bordered" >}}
| | Marginal Units | Unit Price ($) |
| ----------- | ----------- |----------- |
| For the first | 5  | $10 |
| For the next  | 10 | $7  |
| For the next  |  ∞ | $5  |
{{< /bootstrap-table >}}


## Graduated Pricing Calculator

_disclaimer: for now you can only use the hardcoded tiers on this page - but feel free to remix it for your own usecase! Copy the code below and edit `pricingTiers` to update the calculator. The function can be copied directly into your browser console or into anywhere that runs Javascript._

{{< partial "pricing-calculator.html" >}}

---

## The Code

```
{{< read_file_contents path="/layouts/partials/pricing-calculator.html" >}}
```
