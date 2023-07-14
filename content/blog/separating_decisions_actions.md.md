+++
title = "Code Pattern: Separating Decisions and Actions"
date = 2023-07-13T05:00:00.000Z
tags = [ "coding" ]
description = "Making my code easier to unit test by separating the decision-making logic from the actions it initiates."
+++

When developing, I keep running into situations where it turns out better to separate the decision making logic vs the actual actions that arise from it.

## Benefits of separating

A couple clear benefits have popped out when I separate decisions from actions:

* **Simpler to test**
  * Logic to make a decision is often self-contained & stateless, and can be written with few, if any, dependencies.
  * You can pass real-time information, data from storage, user input, or whatever else - use dependency injection to make life easy.
* **Makes assumptions explicit**
  * Instead of a morass of conditionals, you now have clearly labeled outcomes. It should be clear in the future if your assumptions about the array of possible outcomes is missing pieces.

## Negatives

There have to be downsides, right? I haven't found any yet, but I'll update this in the future if it bites me in the... leg.

## Example pseudocode

A quick example to illustrate what I mean.

```
class Decision():
	pass

def make_decision(current_dt: datetime, records: List[dict], env: str) -> Enum:
	if current_dt > MIN_DT and len(records) > 5 and env == "PROD":
		return Decision.outcome_a
	else:
		return Decision.outcome_b

def take_actions(action_type: Enum):
	if action_type == Decision.outcome_a:
		update_db()
	elif action_type == Decision.outcome_b:
		update_db_flag()
		add_message_to_queue()
		start_background_job()
	else:
		raise ValueError('WHAT IS THIS UNKNOWN TYPE!')

def main():
	# collecting whatever inputs you need for decision
	now = datetime.now()
	records_from_db = db.get_filtered_set_of_records()
	env = os.environ["ENV"]
	# .... the sky is the limit....
	decision = make_decision(now, records_from_db, env)
	take_actions(decision)
```
