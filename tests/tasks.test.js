const request = require("supertest");
const app = require("../src/app");

describe("Tasks API", () => {
  
  it("should get all tasks", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
  });

  it("should assign a task", async () => {
  const createRes = await request(app)
    .post("/tasks")
    .send({ title: "Task to assign" });

  const id = createRes.body.id;

  const res = await request(app)
    .patch(`/tasks/${id}/assign`)
    .send({ assignee: "Ujjwal" });

  expect(res.statusCode).toBe(200);
  expect(res.body.assignee).toBe("Ujjwal");
});

it("should return 404 if task not found for assign", async () => {
  const res = await request(app)
    .patch("/tasks/invalid-id/assign")
    .send({ assignee: "Ujjwal" });

  expect(res.statusCode).toBe(404);
});

});