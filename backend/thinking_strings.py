import itertools
import sys
import time

SPINNER_FRAMES = ["-", "\\", "|", "/"]
DOT_FRAMES = [".", "..", "..."]


def build_spinner_frames(label, steps=8, delay_ms=100):
    spinner = itertools.cycle(SPINNER_FRAMES)
    return [
        {"text": f"{label} {next(spinner)}", "delayMs": delay_ms, "kind": "spinner"}
        for _ in range(steps)
    ]


def build_dot_frames(label, steps=6, delay_ms=250):
    dots = itertools.cycle(DOT_FRAMES)
    return [
        {"text": f"{label}{next(dots)}", "delayMs": delay_ms, "kind": "dot"}
        for _ in range(steps)
    ]


def build_terminal_replay(food_name, recommended_ngo):
    replay = [
        {"text": "Food Bridge Python decision worker starting...", "delayMs": 120, "kind": "line"},
        {"text": f"Input Agent received food details for {food_name}.", "delayMs": 120, "kind": "line"},
    ]
    replay.extend(build_spinner_frames("Freshness Agent analysing expiry window...", steps=7, delay_ms=100))
    replay.extend(build_dot_frames("Safety Agent checking storage, packaging and allergen flags", steps=5, delay_ms=220))
    replay.extend(build_spinner_frames("Matching Agent ranking NGOs by distance, capacity and kitchen fit...", steps=6, delay_ms=100))
    replay.append({"text": f"Decision Engine selected {recommended_ngo}.", "delayMs": 120, "kind": "line"})
    replay.append({"text": "Human Review awaiting confirmation.", "delayMs": 120, "kind": "line"})
    return replay


def thinking_loop_demo():
    frames = ["-", "\\", "|", "/"]
    spinner = itertools.cycle(frames)
    print("Food Bridge Python decision worker starting...")
    for _ in range(20):
        sys.stdout.write(f"\rThinking {next(spinner)}")
        sys.stdout.flush()
        time.sleep(0.1)
    sys.stdout.write("\rDone!          \n")


def dot_loop_demo():
    for i in range(12):
        dots = "." * (i % 3 + 1)
        sys.stdout.write(f"\rAnalysing{dots}   ")
        sys.stdout.flush()
        time.sleep(0.25)
    print("\rFinished!     ")


if __name__ == "__main__":
    thinking_loop_demo()
    dot_loop_demo()
