#!/usr/bin/env python3
"""Board analytics for the task board.

A small Python companion tool that turns an exported list of tasks into board
metrics (column counts, completion %, work-in-progress). Run as:

    python3 board_stats.py tasks.json

where tasks.json is a JSON list of task objects (each with a "status").
"""
from __future__ import annotations

import json
import sys
from collections import Counter

STATUSES = ["todo", "doing", "done"]


def summarize(tasks: list[dict]) -> dict:
    counts = Counter(t.get("status", "todo") for t in tasks)
    col = {s: counts.get(s, 0) for s in STATUSES}
    total = sum(col.values())
    done_pct = round(col["done"] / total * 100, 1) if total else 0.0
    return {"counts": col, "total": total, "done_pct": done_pct}


def wip(tasks: list[dict]) -> int:
    """Work in progress = number of tasks in the 'doing' column."""
    return sum(1 for t in tasks if t.get("status") == "doing")


def main(argv: list[str]) -> int:
    if len(argv) != 1:
        sys.stderr.write("usage: board_stats.py <tasks.json>\n")
        return 2
    with open(argv[0], encoding="utf-8") as fh:
        tasks = json.load(fh)
    print(json.dumps(summarize(tasks), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
