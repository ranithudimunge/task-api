# Task Management API — Session 1

A beginner-friendly backend API for managing tasks. It is a **structured 3-tier monolith**: all parts run in one Node.js application, but their responsibilities are separated into three layers.

## Technology choice

- **Node.js** runs the application.
- **Express** handles HTTP requests and responses.
- An in-memory array is used as temporary storage, so no database setup is needed for this session.

This keeps the first assignment focused on architecture rather than database configuration.

## Project structure

```text
task-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── services/
│   │   └── taskService.js
│   ├── repositories/
│   │   └── taskRepository.js
│   ├── app.js
│   └── server.js
├── test/
│   └── taskService.test.js
├── .gitignore
├── package.json
└── README.md
```

## How the layers stay separated

```text
HTTP client → Controller → Service → Repository → task data
```

- **Controller** (`src/controllers`) receives HTTP requests and sends HTTP responses. It does not store data or contain task rules.
- **Service** (`src/services`) contains the application rules: validating a title, checking a task ID, and limiting statuses to `pending`, `in-progress`, or `completed`.
- **Repository** (`src/repositories`) is the only layer that reads or changes the stored tasks. If a database is added later, this is the layer to replace.

`src/app.js` connects the layers together. This is called dependency injection: the service is given a repository, and the controller is given a service.

## Run the project

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. Open a terminal inside the `task-api` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the API:

   ```bash
   npm start
   ```

The server runs at `http://localhost:3000`.

To rerun it automatically after saving code during development, use `npm run dev`.

## Test the project

```bash
npm test
```

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/tasks` | List all tasks |
| `GET` | `/tasks/:id` | Get one task |
| `POST` | `/tasks` | Create a task |
| `PATCH` | `/tasks/:id` | Update title, description, or status |
| `DELETE` | `/tasks/:id` | Delete a task |

### Create a task example

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Finish Session 1 homework","description":"Build the Task API"}'
```

Example response:

```json
{
  "id": 1,
  "title": "Finish Session 1 homework",
  "description": "Build the Task API",
  "status": "pending"
}
```

### Mark a task as completed

```bash
curl -X PATCH http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

## Important limitation

Tasks exist only while the server is running. Restarting the server clears them. That is intentional for this first architecture assignment; a future version can replace the repository's in-memory storage with a real database.
