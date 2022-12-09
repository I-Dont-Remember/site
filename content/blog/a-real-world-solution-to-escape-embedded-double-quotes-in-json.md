+++
categories = []
date = 2022-12-09T06:00:00Z
description = ""
draft = true
images = []
tags = []
title = "A Real-World Solution to Escape Embedded Double Quotes in JSON"

+++
**The problem:** you need to decode a JSON string, but at some point in the process you don't control, unescaped double quotes are inserted into your string values. How might you sanitize the string to get a valid JSON object for decoding?

> ⚠️
> _The first answer I saw on Stack Overflow was "Go make the upstream service give you valid JSON, \[duh you idiot (implied tone added by me)\]". Helpful! Sometimes you're stuck in crappy situations and need a way forward, even if it's not ideal. Hopefully this article is the answer for someone in the future I wish I had found._

## Why

Why am I bothering to do this? JSON with unescaped double quotes in it isn't valid JSON, so shouldn't it be getting sanitized before reaching me? Unfortunately, no. As a part of building [Workflow Buddy](https://github.com/happybara-io/WorkflowBuddy/), an open-source tool to extend [Slack's no-code workspace automation](https://slack.com/features/workflow-automation), I need to handle untrusted variables being inserted into plain-text JSON strings before I have a chance to decode them.

An actual example of this in action looks like:
```
# Example with variable.
{
  "key": "{{65591853-edfe-4721-856d-ecd157766461==plain_text_user_input}}"
}
```

then becomes
```
# Example with variable inserted with double quotes scattered inside.
{
"key": "value with "two quotes" inside"
}
```

This makes the standard JSON parser go 💥, because how is it supposed to know you didn't want `key: "value with "` and just forgot to add another key after?

## Why do I let people build their own JSON strings in plain-text input blocks

It provides the most flexibility for end users. I don't want my arbitrary decisions to block them from the critical last-mile of what they're building. Whether you think that's a stupid reason or not, this article is moving on without you.

## Potential approaches
As the intrepid developer I am, I checked Stack Overflow first and came up with squat that felt useful. As all heroes do, after crying in the bathroom that they failed me, I closed all my SO tabs and started frantically coming up with ideas. Gotta dig through some garbage to find the gold, right?

- 🤮 Randomly change a quote to escaped, then see if decode works _(slow and inefficient)_.
- 😖 Walk through string chars, keep a STATE to check if we are in a key or a value - _(how to actually tell if we are in a key/value vs just finding JSON special characters, e.g. {}",, in a string?)_.
- 🤔🥇 Make an educated guess for which quote we could escape, then try to decode again and see what happens.

## Escape double quotes in JSON with Python

This Python version follows the principle of _"Ask forgiveness, not permission"_. When we get a decoding failure, we make an educated guess about which quote we can tweak (e.g. convert to escaped, `\"`), then attempt to decode again. If the decoder made deeper progress into the string, it was a positive change. If not, then we really mucked things up and should bubble the error up.

```
SOLUTION
```

## Limitations

Is this a perfect solution? Nope, you'll have to consider if the limitations screw up your use case. The most important limitation I've found is if you provide some valid JSON inside of your string, you'll end up with different top level keys in your object than you expect. For example:

```
 # valid unescaped JSON nested inside string - won't error, but won't come out as you want.
 
{
"key": "JSON inside me {"a": "b","c": "d"} "
}
```

What you'll get is:
```
# Woh, now we have a 'c' key!
{
"key": "JSON inside me {\"a\": \"b",
"c": "d\"} "
}
```

If you are curious about digging deeper, feel free to check out the test cases for the parser in the [Workflow Buddy repo](https://github.com/happybara-io/WorkflowBuddy/blob/main/tests/test_utils.py). Function is `sut.sanitize_unescaped_quotes_and_load_json_str(test_str)`.

## Escape double quotes in JSON with Javascript (WIP)

> ⚠️
> _Not completed yet, but dropping my thoughts from initial exploration here, since it seemed possible to get very similar functionality to the Python sanitizer._

When a Decode error occurs, you get access to `e.message`, example:

```
JSON.parse: expected ',' or '}' after property value in object at line 1 column 39 of the JSON data
```

and and could then parse it for the `line 1 col 39` bit. Unfortunately, but that's not the exact same as `pos` in the Python example. 
You should be able to get creative and "hop" lines by looking for next `\n`, then using the column info.
Ideally we would find a way to do it without needing any information from the decoder other than `success/failure` - then any language would be able to use it.

### WIP JSON testing
```
const json = '{"result":true, "count":42, "str": "a"bc"}';
try {
  const obj = JSON.parse(json);
	console.log(obj);
} catch(e) {
  console.error(e instanceof SyntaxError);
  console.error(e.message);
  console.error(e.name);
  console.error(e.fileName);
  console.error(e.lineNumber); // line number where error happened in code, not in parsing
  console.error(e.columnNumber); // col where error happened in code, not in parsing
  console.error(e.stack);
}
```

## Tell me why I'm wrong

As this is the internet, someone reading this will have an opinion about my approach. Let me know if you have suggestions or alternative approaches through [Twitter DMs]() or my [email proxy]().