"""Tests for the board analytics tool."""
from board_stats import summarize, wip


def test_summarize_counts_and_percentage():
    tasks = [{"status": "todo"}, {"status": "done"}, {"status": "done"}, {"status": "doing"}]
    out = summarize(tasks)
    assert out["counts"] == {"todo": 1, "doing": 1, "done": 2}
    assert out["total"] == 4 and out["done_pct"] == 50.0


def test_summarize_empty():
    assert summarize([]) == {"counts": {"todo": 0, "doing": 0, "done": 0}, "total": 0, "done_pct": 0.0}


def test_wip():
    assert wip([{"status": "doing"}, {"status": "doing"}, {"status": "todo"}]) == 2


def test_defaults_missing_status_to_todo():
    assert summarize([{}, {}])["counts"]["todo"] == 2
