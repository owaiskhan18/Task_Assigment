# Task Manager REST API

Assignment 1 — Weeks 1–4  
Built with Node.js, the core `http` module, and Express.js. Task data is stored in an in-memory array; no database is used.

## Requirements

- Node.js 18 or newer
- npm
- Postman (for API testing and recording)

## Part A — Node.js CLI

Open a terminal in `part-a-cli` and run:

```bash
node task.js "Finish Task Manager assignment"
```

Expected output:

```text
New task: Finish Task Manager assignment
```

Try without an argument:

```bash
node task.js
```

The program displays usage instructions.

## Part B — Core HTTP server

Open a terminal in `part-b-http-server` and run:

```bash
node server.js
```

The server starts at `http://localhost:3001`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Server welcome message |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get one task by ID |

This part uses Node's built-in `http` module and manually checks the method and URL.

## Part C & D — Express REST API

Open a terminal in `part-c-express-api` and install dependencies:

```bash
npm install
npm start
```

The API starts at `http://localhost:3000`.

### Endpoints

| Method | Endpoint | Description | Success status |
|---|---|---|---|
| GET | `/api/v1/tasks` | Get all tasks | 200 |
| GET | `/api/v1/tasks/:id` | Get one task | 200 |
| POST | `/api/v1/tasks` | Create a task | 201 |
| PUT | `/api/v1/tasks/:id` | Update title and/or completed | 200 |
| DELETE | `/api/v1/tasks/:id` | Delete a task | 200 |

### Example request bodies

Create a task — `POST /api/v1/tasks`:

```json
{
  "title": "Practice Express"
}
```

Update a task — `PUT /api/v1/tasks/1`:

```json
{
  "title": "Practice Express routes",
  "completed": true
}
```

You can also update only one field, for example:

```json
{
  "completed": true
}
```

### Status codes

- `200 OK`: successful read, update, or delete.
- `201 Created`: task successfully created.
- `400 Bad Request`: invalid ID, missing/invalid title, invalid completed value, or invalid JSON.
- `404 Not Found`: task or route does not exist.
- `500 Internal Server Error`: unexpected server error.

### Notes

- Data is stored in a JavaScript array, as required by the assignment.
- Data resets when the Express server restarts.
- IDs are generated in memory.
- `PUT` accepts `title`, `completed`, or both.

## Postman testing checklist

1. Start the Express server with `npm start`.
2. Send `GET http://localhost:3000/api/v1/tasks`.
3. Send `POST http://localhost:3000/api/v1/tasks` with JSON body `{ "title": "My first task" }`.
4. Copy the returned task ID and send `GET http://localhost:3000/api/v1/tasks/3` (adjust the ID if needed).
5. Send `PUT http://localhost:3000/api/v1/tasks/3` with `{ "completed": true }`.
6. Send `DELETE http://localhost:3000/api/v1/tasks/3`.
7. Test an invalid ID such as `/api/v1/tasks/999` and show the `404` response.
8. Test an empty title with POST and show the `400` response.

For the assignment recording, show the requests, response JSON, and status codes in Postman. Do not show only the code.

## Suggested GitHub repository name

`task-manager-rest-api`

Upload this complete project folder to your own GitHub repository. Add your own name and class details if your instructor requires them.
