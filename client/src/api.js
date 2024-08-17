const BASE = import.meta.env?.VITE_API_URL || "";
async function req(path, opts) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { "Content-Type": "application/json" }, ...opts });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.status === 204 ? null : res.json();
}
export const listTasks = () => req("/tasks");
export const createTask = (title, status = "todo") =>
  req("/tasks", { method: "POST", body: JSON.stringify({ title, status }) });
export const moveTask = (id, status) =>
  req(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
export const deleteTask = (id) => req(`/tasks/${id}`, { method: "DELETE" });
