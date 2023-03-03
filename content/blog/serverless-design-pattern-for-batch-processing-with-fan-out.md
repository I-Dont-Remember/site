+++
categories = ["TIL"]
date = 2023-03-03T06:00:00Z
description = ""
draft = true
images = []
tags = ["AWS", "Serverless", "Design-Patterns"]
title = "Serverless Design Pattern for Batch Processing with Fan Out"

+++
This is a simple serverless design pattern that has come in handy numerous times during my career. The problem: I need to process a large amount of data through a Lambda and am running into timeouts even at 15 minutes - or maybe I just need the process to hurry itself along.

## Serverless Batch Processing

The design pattern only requires a single Lambda, with a conditional variable in the input that chooses how the Lambda will behave. It will either operate as **A)** the fan-out orchestrator, or **B)** process a single item/batch.

  
![](/uploads/serverless-batch-processing-smaller.jpg)

The pseudocode from the photo is repeated below:

    action = input["action"] or "process_chunk"
    
    if action == "start_fanout":
      chunks = break_data_into_chunks(
            data, size=1000)
      for chunk in chunks:
        input = {
             action: "process_chunk",
             data_chunk: chunk
          }
        invoke_lambda("Lambda Name", input)
    elif action == "process_chunk":
        processing_func(data_chunk)
    else:
      # handle it 

In the example, `action` is our key conditional trigger.