import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App.jsx";

describe("Task Board App", () => {
  beforeEach(() => vi.restoreAllMocks());
  it("renders tasks in their columns", async () => {
    globalThis.fetch = vi.fn(() => Promise.resolve({
      ok: true, status: 200,
      json: async () => [{ id: "1", title: "Ship it", status: "doing" }],
    }));
    render(<App />);
    await waitFor(() => expect(screen.getByText("Ship it")).toBeInTheDocument());
    expect(screen.getByText("→ done")).toBeInTheDocument();
  });
});
