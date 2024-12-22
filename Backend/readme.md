routes -

RajnishPuri: write the md file beautful

GitHub Copilot: Here is a more structured and formatted version of your Markdown file:

```markdown
# API Routes

## Auth Routes

### Register
**Endpoint:** `http://localhost:3000/api/auth/register`

**Request Body:**
```json
{
    "name": "user 1",
    "email": "user@gmail.com",
    "password": "Raj15...",
    "role": "user"
}
```

**Response:**

```json
{
    "success": true,
    "message": "User created successfully!",
    "user": {
        "name": "user 1",
        "email": "user2@gmail.com",
        "password": "$2b$10$.4q2/HQRk3L12aZJmcoH9OxeGI79wu5SGqmi7KUNMTDp59OP/i2fa",
        "role": "user",
        "tasks": [],
        "_id": "6767d6c730edf6a0eec8ce3f",
        "createdAt": "2023-10-01T00:00:00.000Z"
    }
}
```

```

This version uses headings, code blocks, and proper indentation to make the content more readable and visually appealing.
This version uses headings, code blocks, and proper indentation to make the content more readable and visually appealing.

RajnishPuri: 

routes -

Auth Routes
- http://localhost:3000/api/auth/register - Register
- {
    "name":"user 1",
    "email":"user@gmail.com",
    "password":"Raj15...",
    "role":"user"
}
- {
    "success": true,
    "message": "User created successfully!",
    "user": {
        "name": "user 1",
        "email": "user2@gmail.com",
        "password": "$2b$10$.4q2/HQRk3L12aZJmcoH9OxeGI79wu5SGqmi7KUNMTDp59OP/i2fa",
        "role": "user",
        "tasks": [],
        "_id": "6767d6c730edf6a0eec8ce3f",
        "createdAt": "2024-12-22T09:07:19.698Z",
        "updatedAt": "2024-12-22T09:07:19.698Z",
        "__v": 0
    }
}

- http://localhost:3000/api/auth/login - login 
- {
    "email":"user@gmail.com",
    "password":"Raj15..."
}
- {
    "success": true,
    "message": "Login successful!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY3YzcyOTI3MjdlMGNiNTlhZGFjNzIiLCJpYXQiOjE3MzQ4NTg1MDgsImV4cCI6MTczNDk0NDkwOH0.3WU9jPChjheMxF-hBYFWYW-taQx7HeGqLEuXGOn2mZc"
}

- http://localhost:3000/api/auth/logout - logout
- {
    "message": "Logged Out"
}

Task Creation - 
Admin - 

- http://localhost:3000/api/task/createtask - create task
- {
    "title":"New Task 3",
    "description":"New task desc 3",
    "dueDate":"10-10-2025",
    "priority":"Medium",
    "assignedTo":"6767c7292727e0cb59adac72"
}
- {
    "message": "Task created successfully"
}

- http://localhost:3000/api/task/edittask/:id - Edit Task
- {
    "title":"Updated New Task 1",
    "description":"Update task desc 2",
    "dueDate":"10-10-2025",
    "priority":"High",
    "assignedTo":"6767c7292727e0cb59adac72"
}
- {
    "message": "Task updated successfully",
    "task": {
        "_id": "6767c7e72727e0cb59adac77",
        "title": "Updated New Task 1",
        "description": "Update task desc 2",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "completed",
        "priority": "High",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T08:03:51.182Z",
        "updatedAt": "2024-12-22T08:15:21.735Z",
        "__v": 0
    }
}

- http://localhost:3000/api/task/deletetask/:id - delete task
- {
    "message": "Task deleted successfully"
}

- http://localhost:3000/api/task/getalltasks - getalltask
- [
    {
        "_id": "6767c7e72727e0cb59adac77",
        "title": "Updated New Task 1",
        "description": "Update task desc 2",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "completed",
        "priority": "High",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T08:03:51.182Z",
        "updatedAt": "2024-12-22T08:15:21.735Z",
        "__v": 0
    },
    {
        "_id": "6767d75e30edf6a0eec8ce46",
        "title": "New Task 3",
        "description": "New task desc 3",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "pending",
        "priority": "Medium",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T09:09:50.313Z",
        "updatedAt": "2024-12-22T09:09:50.313Z",
        "__v": 0
    }
]

- http://localhost:3000/api/task/gettasks/:id get task of particular user
- [
    {
        "_id": "6767c7e72727e0cb59adac77",
        "title": "Updated New Task 1",
        "description": "Update task desc 2",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "completed",
        "priority": "High",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T08:03:51.182Z",
        "updatedAt": "2024-12-22T08:15:21.735Z",
        "__v": 0
    },
    {
        "_id": "6767d75e30edf6a0eec8ce46",
        "title": "New Task 3",
        "description": "New task desc 3",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "pending",
        "priority": "Medium",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T09:09:50.313Z",
        "updatedAt": "2024-12-22T09:09:50.313Z",
        "__v": 0
    }
]

- Users

- http://localhost:3000/api/task/updatetaskstatus/:id - update status
- {
    "status":"completed"
}
- {
    "message": "Task status updated successfully"
}

- http://localhost:3000/api/task/getmytasks - all user tasks
- [
    {
        "_id": "6767c7e72727e0cb59adac77",
        "title": "Updated New Task 1",
        "description": "Update task desc 2",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "completed",
        "priority": "High",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T08:03:51.182Z",
        "updatedAt": "2024-12-22T08:15:21.735Z",
        "__v": 0
    },
    {
        "_id": "6767d75e30edf6a0eec8ce46",
        "title": "New Task 3",
        "description": "New task desc 3",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "pending",
        "priority": "Medium",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T09:09:50.313Z",
        "updatedAt": "2024-12-22T09:09:50.313Z",
        "__v": 0
    }
]

write these in readme.md more beautifully

GitHub Copilot: Here is a more structured and formatted version of your Markdown file:

```markdown
# API Routes

## Auth Routes

### Register
**Endpoint:** `http://localhost:3000/api/auth/register`

**Request Body:**
```json
{
    "name": "user 1",
    "email": "user@gmail.com",
    "password": "Raj15...",
    "role": "user"
}
```

**Response:**

```json
{
    "success": true,
    "message": "User created successfully!",
    "user": {
        "name": "user 1",
        "email": "user2@gmail.com",
        "password": "$2b$10$.4q2/HQRk3L12aZJmcoH9OxeGI79wu5SGqmi7KUNMTDp59OP/i2fa",
        "role": "user",
        "tasks": [],
        "_id": "6767d6c730edf6a0eec8ce3f",
        "createdAt": "2024-12-22T09:07:19.698Z",
        "updatedAt": "2024-12-22T09:07:19.698Z",
        "__v": 0
    }
}
```

### Login

**Endpoint:** `http://localhost:3000/api/auth/login`

**Request Body:**

```json
{
    "email": "user@gmail.com",
    "password": "Raj15..."
}
```

**Response:**

```json
{
    "success": true,
    "message": "Login successful!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY3YzcyOTI3MjdlMGNiNTlhZGFjNzIiLCJpYXQiOjE3MzQ4NTg1MDgsImV4cCI6MTczNDk0NDkwOH0.3WU9jPChjheMxF-hBYFWYW-taQx7HeGqLEuXGOn2mZc"
}
```

### Logout

**Endpoint:** `http://localhost:3000/api/auth/logout`

**Response:**

```json
{
    "message": "Logged Out"
}
```

## Task Routes

### Create Task (Admin)

**Endpoint:** `http://localhost:3000/api/task/createtask`

**Request Body:**

```json
{
    "title": "New Task 3",
    "description": "New task desc 3",
    "dueDate": "10-10-2025",
    "priority": "Medium",
    "assignedTo": "6767c7292727e0cb59adac72"
}
```

**Response:**

```json
{
    "message": "Task created successfully"
}
```

### Edit Task

**Endpoint:** `http://localhost:3000/api/task/edittask/:id`

**Request Body:**

```json
{
    "title": "Updated New Task 1",
    "description": "Update task desc 2",
    "dueDate": "10-10-2025",
    "priority": "High",
    "assignedTo": "6767c7292727e0cb59adac72"
}
```

**Response:**

```json
{
    "message": "Task updated successfully",
    "task": {
        "_id": "6767c7e72727e0cb59adac77",
        "title": "Updated New Task 1",
        "description": "Update task desc 2",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "completed",
        "priority": "High",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T08:03:51.182Z",
        "updatedAt": "2024-12-22T08:15:21.735Z",
        "__v": 0
    }
}
```

### Delete Task

**Endpoint:** `http://localhost:3000/api/task/deletetask/:id`

**Response:**

```json
{
    "message": "Task deleted successfully"
}
```

### Get All Tasks

**Endpoint:** `http://localhost:3000/api/task/getalltasks`

**Response:**

```json
[
    {
        "_id": "6767c7e72727e0cb59adac77",
        "title": "Updated New Task 1",
        "description": "Update task desc 2",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "completed",
        "priority": "High",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T08:03:51.182Z",
        "updatedAt": "2024-12-22T08:15:21.735Z",
        "__v": 0
    },
    {
        "_id": "6767d75e30edf6a0eec8ce46",
        "title": "New Task 3",
        "description": "New task desc 3",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "pending",
        "priority": "Medium",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T09:09:50.313Z",
        "updatedAt": "2024-12-22T09:09:50.313Z",
        "__v": 0
    }
]
```

### Get Tasks of a Particular User

**Endpoint:** `http://localhost:3000/api/task/gettasks/:id`

**Response:**

```json
[
    {
        "_id": "6767c7e72727e0cb59adac77",
        "title": "Updated New Task 1",
        "description": "Update task desc 2",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "completed",
        "priority": "High",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T08:03:51.182Z",
        "updatedAt": "2024-12-22T08:15:21.735Z",
        "__v": 0
    },
    {
        "_id": "6767d75e30edf6a0eec8ce46",
        "title": "New Task 3",
        "description": "New task desc 3",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "pending",
        "priority": "Medium",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T09:09:50.313Z",
        "updatedAt": "2024-12-22T09:09:50.313Z",
        "__v": 0
    }
]
```

### Update Task Status

**Endpoint:** `http://localhost:3000/api/task/updatetaskstatus/:id`

**Request Body:**

```json
{
    "status": "completed"
}
```

**Response:**

```json
{
    "message": "Task status updated successfully"
}
```

### Get All User Tasks

**Endpoint:** `http://localhost:3000/api/task/getmytasks`

**Response:**

```json
[
    {
        "_id": "6767c7e72727e0cb59adac77",
        "title": "Updated New Task 1",
        "description": "Update task desc 2",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "completed",
        "priority": "High",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T08:03:51.182Z",
        "updatedAt": "2024-12-22T08:15:21.735Z",
        "__v": 0
    },
    {
        "_id": "6767d75e30edf6a0eec8ce46",
        "title": "New Task 3",
        "description": "New task desc 3",
        "dueDate": "2025-10-09T18:30:00.000Z",
        "status": "pending",
        "priority": "Medium",
        "createdBy": "6767a1172cf7035bd7e52d80",
        "assignedTo": [
            "6767c7292727e0cb59adac72"
        ],
        "isDeleted": false,
        "createdAt": "2024-12-22T09:09:50.313Z",
        "updatedAt": "2024-12-22T09:09:50.313Z",
        "__v": 0
    }
]
```
