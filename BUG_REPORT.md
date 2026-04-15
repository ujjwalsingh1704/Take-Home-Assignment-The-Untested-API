### Bug: Incorrect pagination offset calculation

Expected Behavior:
When requesting page 1 with a given limit (e.g., page=1, limit=10), the API should return the first 10 tasks.

Actual Behavior:
The API skips the first set of tasks and starts from a later index.

How Found:
By reviewing the getPaginated function logic:
offset is calculated as (page * limit) instead of (page - 1) * limit.

Suggested Fix:
Change the offset calculation from:
const offset = page * limit;

To:
const offset = (page - 1) * limit;

### Bug: Completing a task resets priority to medium

Expected Behavior:
When marking a task as completed, the task's priority should remain unchanged.

Actual Behavior:
The priority is always reset to "medium" regardless of its original value.

How Found:
While reviewing the completeTask function logic during testing.

Suggested Fix:
Remove the line that sets priority to "medium" in completeTask.


### Bug: Task can be created without title

Expected Behavior:
Task creation should fail or throw an error when title is missing.

Actual Behavior:
Task is created successfully with title as undefined.

How Found:
By testing create function with empty input in unit tests.

Suggested Fix:
Add validation to ensure title is required before creating a task.