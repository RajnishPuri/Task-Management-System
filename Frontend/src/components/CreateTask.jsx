import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [assignedTo, setAssignedTo] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/auth/allUser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setMessage("Failed to fetch users");
                console.error("Error:", error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            dueDate,
            priority,
            assignedTo,
        };

        try {
            const response = await fetch("http://localhost:3000/api/task/createtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                navigate("/tasks");
            } else {
                setMessage(data.message || "Failed to create task");
            }
        } catch (error) {
            setMessage("An error occurred while creating the task.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>

            {message && <p className="text-center mb-4 text-red-500">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block">Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block">Priority:</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div>
                    <label className="block">Assign To:</label>
                    <select
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                        required
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded mt-4"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default CreateTask;
