+++
date = 2017-08-09T05:00:00Z
categories = ["Archive"]
images = []
title = "Out of Context"
+++

I've been bumming around with Flask recently and came across
  an issue that took me quite a while to find the workaround for
  so figured I'd share it here.

As I found out, Flask has two context stacks while it is running,
 the app context and the request context.  Occasionally an odd error can pop up in your code complaining about "working outside of application context".

< *This solution will be fleshed out more with the Stack Overflow links I had used this fall once I've finished the projects I keep trying to find time for* >

The solution, though it seems hacky and there is definitely a more efficient way to do it if I had a better base understanding, was to use the `_get_current_object` and pass that into the method. I could then call `app_obj.app_context()` to get the correct context I needed for the database call I was attempting to make.
