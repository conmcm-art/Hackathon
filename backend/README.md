# Food Bridge Python decision worker

This backend receives food + NGO data, calculates urgency, safety risk, and NGO match scores, then returns an explainable recommendation and a terminal replay.

The React app calls this worker first. If it is offline, the app uses a local JavaScript fallback with the same response shape.

“The Python terminal loops are a stylistic nod to classic Python scripts. They use strings, loops, itertools.cycle, sys.stdout.write, carriage returns and flush to emulate a thinking/loading loop. In the app, those strings become a transparent terminal replay, not hidden chain-of-thought.”

“Python threads are used here to emulate separate AI agents waiting on independent tool calls. In CPython, the GIL limits CPU-heavy threaded work, but threads are still useful for I/O-style waiting. This makes the demo feel like several agents are working at once while keeping the logic simple and transparent.”

## Run

- `python backend/server.py`
- `python backend/thinking_strings.py`
- `python -m unittest discover -s backend -p 'test_*.py'`
