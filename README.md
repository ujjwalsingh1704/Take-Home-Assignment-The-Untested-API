# Task Manager API – Take Home Assignment

## 🚀 Overview

This is a Task Manager API built using Node.js and Express.
The assignment focused on testing, debugging, and feature development.

---

## 🧪 Testing

* Unit tests for service layer
* Integration tests using Supertest
* Edge cases covered
* Test coverage ~80%+

Run tests:

```bash
npm test
```

---

## 🐛 Bugs Identified

* Incorrect pagination logic (fixed)
* Task priority reset on completion
* Missing validation for title
* Weak filtering logic

See `BUG_REPORT.md` for details.

---

## 🔧 Bug Fix

Fixed pagination offset calculation:

```js
const offset = (page - 1) * limit;
```

---

## 🚀 New Feature

### Assign Task

```http
PATCH /tasks/:id/assign
```

#### Request:

```json
{
  "assignee": "Ujjwal"
}
```

#### Response:

```json
{
  "id": "...",
  "assignee": "Ujjwal"
}
```

---

## 📦 Tech Stack

* Node.js
* Express
* Jest
* Supertest

---

## 🧠 Improvements (Future Work)

* Add authentication
* Add database (currently in-memory)
* Add validation middleware
* Add rate limiting

---

## 🏁 Conclusion

This project demonstrates:

* Test-driven debugging
* API design
* Backend problem-solving

---
