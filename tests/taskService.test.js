const { create, update, remove, completeTask, getStats, getPaginated, getByStatus, _reset } = require("../src/services/taskService");


describe("Task Service", () => {

  beforeEach(() => {
    _reset();
  });

  it("should create a task with valid input", () => {
    const task = create({
      title: "Test Task",
      description: "Testing"
    });

    expect(task).toHaveProperty("id");
    expect(task.title).toBe("Test Task");
    expect(task.status).toBe("todo");
    expect(task.priority).toBe("medium");
  });

  it("should update a task successfully", () => {
    const task = create({
      title: "Old Title",
      description: "Old Desc"
    });

    const updated = update(task.id, {
      title: "New Title"
    });

    expect(updated.title).toBe("New Title");
  });

  it("should return null if task not found", () => {
    const result = update("invalid-id", { title: "Test" });

    expect(result).toBeNull();
  });

  it("should delete a task successfully", () => {
    const task = create({
      title: "Task to delete"
    });

    const result = remove(task.id);

    expect(result).toBe(true);
  });

  it("should return false if task not found for deletion", () => {
    const result = remove("invalid-id");

    expect(result).toBe(false);
  });

  it("should mark task as completed", () => {
  const task = create({
    title: "Complete me"
  });

  const completed = completeTask(task.id);

  expect(completed.status).toBe("done");
  expect(completed.completedAt).not.toBeNull();
});

it("should return null if task not found for completion", () => {
  const result = completeTask("invalid-id");

  expect(result).toBeNull();
});

it("should handle missing title", () => {
  const task = create({});

  expect(task.title).toBeUndefined(); // current behavior
});

it("should return correct task stats", () => {
  create({ title: "Task 1", status: "todo" });
  create({ title: "Task 2", status: "in_progress" });
  create({ title: "Task 3", status: "done" });
  const stats = getStats();

  expect(stats.todo).toBe(1);
  expect(stats.in_progress).toBe(1);
  expect(stats.done).toBe(1);
});

it("should return correct paginated results", () => {
  const t1 = create({ title: "Task 1" });
  const t2 = create({ title: "Task 2" });
  const t3 = create({ title: "Task 3" });

  const page1 = getPaginated(1, 2);

 

  expect(page1.length).toBe(2);
  expect(page1[0].title).toBe("Task 1");
  expect(page1[1].title).toBe("Task 2");
});

it("should return tasks filtered by status", () => {
  create({ title: "Task 1", status: "todo" });
  create({ title: "Task 2", status: "in_progress" });
  create({ title: "Task 3", status: "done" });

  const result = getByStatus("todo");

  expect(result.length).toBe(1);
  expect(result[0].title).toBe("Task 1");
});

});