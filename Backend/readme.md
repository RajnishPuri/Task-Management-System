### Register

**Endpoint:** `http://localhost:3000/api/auth/register`

**Request Body:**

```json
{
{
    "name":"user",
    "email":"user@gmail.com",
    "password":"pass",
    "role":"user"
}
}
```

**Response:**

```json
{
    "success": true,
    "message": "User created successfully!",
    "user": {
        "name": "user",
        "email": "user@gmail.com",
        "password": "passbcrypted",
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
    "password": "pass"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Login successful!",
    "token": "jwttoken"
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
    "title": "New Task",
    "description": "New task desc",
    "dueDate": "10-10-2025",
    "priority": "Medium",
    "assignedTo": "userId"
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
    "title": "Updated New Task",
    "description": "Update task desc",
    "dueDate": "10-10-2025",
    "priority": "High",
    "assignedTo": "userId"
}
```

**Response:**

```json
{
    "message": "Task updated successfully",
    "task": {
        "_id": "taskis",
        "title": "Updated New Task",
        "description": "Update task desc",
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
    {task1},
    {task2}
]
```

### Get Tasks of a Particular User

**Endpoint:** `http://localhost:3000/api/task/gettasks/:id`

**Response:**

```json
[
    {
       task1
    },
    {
       task2
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
        task1
    },
    {
       task2
    }
]
```
