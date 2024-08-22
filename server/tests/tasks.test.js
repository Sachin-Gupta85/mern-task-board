const request = require("supertest");
const app = require("../src/app");

describe("task board API", () => {
  test("health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.body).toEqual({ status: "ok" });
  });

  test("create assigns column order and returns id", async () => {
    const a = await request(app).post("/api/tasks").send({ title: "A" });
    const b = await request(app).post("/api/tasks").send({ title: "B" });
    expect(a.status).toBe(201);
    expect(a.body.id).toBeDefined();
    expect(a.body.status).toBe("todo");
    expect(a.body.order).toBe(0);
    expect(b.body.order).toBe(1);
  });

  test("rejects empty title and bad status", async () => {
    expect((await request(app).post("/api/tasks").send({ title: "" })).status).toBe(400);
    expect((await request(app).post("/api/tasks").send({ title: "x", status: "nope" })).status).toBe(400);
  });

  test("move task across columns via PATCH", async () => {
    const { body } = await request(app).post("/api/tasks").send({ title: "Move me" });
    const res = await request(app).patch(`/api/tasks/${body.id}`).send({ status: "doing" });
    expect(res.body.status).toBe("doing");
  });

  test("list is grouped by status then order", async () => {
    await request(app).post("/api/tasks").send({ title: "t1", status: "todo" });
    await request(app).post("/api/tasks").send({ title: "d1", status: "doing" });
    const res = await request(app).get("/api/tasks");
    expect(res.body.map((t) => t.title)).toEqual(["d1", "t1"]); // doing < todo alphabetically
  });

  test("delete and 404", async () => {
    const { body } = await request(app).post("/api/tasks").send({ title: "Temp" });
    expect((await request(app).delete(`/api/tasks/${body.id}`)).status).toBe(204);
    expect((await request(app).delete(`/api/tasks/${body.id}`)).status).toBe(404);
  });
});
