import React, { useEffect, useState } from "react";
import { listTasks, createTask, moveTask, deleteTask } from "./api.js";

const COLUMNS = ["todo", "doing", "done"];
const NEXT = { todo: "doing", doing: "done", done: "todo" };

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function refresh() { setTasks(await listTasks()); }
  useEffect(() => { refresh(); }, []);

  async function onAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask(title.trim());
    setTitle(""); refresh();
  }

  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>🗂️ Task Board</h1>
      <form onSubmit={onAdd} style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input aria-label="title" placeholder="New task" value={title} onChange={(e) => setTitle(e.target.value)} style={{ flex: 1 }} />
        <button type="submit">Add</button>
      </form>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {COLUMNS.map((col) => (
          <section key={col} style={{ background: "#f6f6f6", borderRadius: 8, padding: 12 }}>
            <h3 style={{ textTransform: "capitalize" }}>{col}</h3>
            {tasks.filter((t) => t.status === col).map((t) => (
              <div key={t.id} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 6, padding: 8, marginBottom: 8 }}>
                {t.title}
                <div>
                  <button onClick={async () => { await moveTask(t.id, NEXT[t.status]); refresh(); }}>→ {NEXT[t.status]}</button>
                  <button onClick={async () => { await deleteTask(t.id); refresh(); }} style={{ float: "right" }}>✕</button>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
