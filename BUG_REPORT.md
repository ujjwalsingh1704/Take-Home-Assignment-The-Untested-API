# 🐛 Bug Report — Task Manager API

---

## 1. Incorrect Pagination Offset Calculation (Fixed)

**Expected Behavior**
For `page = 1` and `limit = N`, the API should return the first `N` tasks.

**Actual Behavior**
The API skips the first set of tasks and returns incorrect results.

**Root Cause**
Offset is calculated incorrectly:

```js
const offset = page * limit;
```

**Fix Applied**

```js
const offset = (page - 1) * limit;
```

**Impact**
Incorrect data returned to clients, especially on the first page.

---

## 2. Task Completion Resets Priority

**Expected Behavior**
Completing a task should not modify its priority.

**Actual Behavior**
Task priority is forcibly set to `"medium"` when marked as completed.

**Root Cause**

```js
priority: 'medium'
```

**Suggested Fix**
Remove the forced priority assignment and preserve the original value.

**Impact**
Unintended data mutation leading to loss of original priority information.

---

## 3. Missing Validation for Task Title

**Expected Behavior**
Task creation should fail if the `title` field is missing or empty.

**Actual Behavior**
Tasks are created successfully even when `title` is `undefined`.

**Root Cause**
No validation check for required fields during task creation.

**Suggested Fix**
Add validation to ensure `title` is required before creating a task.

**Impact**
Invalid or incomplete data can be stored, affecting data quality.

---

## 4. Inaccurate Status Filtering Logic

**Expected Behavior**
Filtering by status should return only exact matches (e.g., `"todo"` returns only `"todo"` tasks).

**Actual Behavior**
Filtering uses partial matching via `.includes()`, which may return unintended results.

**Root Cause**

```js
t.status.includes(status)
```

**Suggested Fix**

```js
t.status === status
```

**Impact**
Incorrect filtering results, especially if similar status values are introduced.

---

# 📊 Summary

| Category        | Count |
| --------------- | ----- |
| Bugs Identified | 4     |
| Bugs Fixed      | 1     |
| Remaining       | 3     |

---

# 🧠 Approach

Bugs were identified through:

* Unit testing (service layer)
* Integration testing (API endpoints)
* Code inspection and edge case analysis

---

# 🏁 Conclusion

The system is functional but requires improvements in:

* Input validation
* Data integrity
* Logical correctness

---
