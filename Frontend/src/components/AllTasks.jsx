import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState("priority");
    const [userFilter, setUserFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [timeFilter, setTimeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchTasks();
            fetchUsers();
        }
    }, [navigate, token]);

    const fetchTasks = async () => {
        const response = await fetch("http://localhost:3000/api/task/getalltasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setTasks(data);
    };

    const fetchUsers = async () => {
        const response = await fetch("http://localhost:3000/api/auth/allUser", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);
        setUsers(data);
    };

    const applyFilters = () => {
        let filtered = [...tasks];

        if (priorityFilter) {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }

        if (timeFilter) {
            if (timeFilter === "soon") {
                filtered = filtered.filter(task => new Date(task.dueDate) <= new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
            } else if (timeFilter === "later") {
                filtered = filtered.filter(task => new Date(task.dueDate) > new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
            }
        }

        if (userFilter) {
            filtered = filtered.filter(task =>
                task.assignedTo.some(user => user.name === userFilter)
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(task => task.status === statusFilter);
        }

        setFilteredTasks(filtered);
    };

    const handleEdit = (task) => {
        setIsEditing(true);
        setEditTask(task);
    };

    const handleView = (taskId) => {
        const task = tasks.find(task => task._id === taskId);
        setSelectedTask(task);
        setIsSelected(true);
    };

    const handleEditSave = async () => {
        const response = await fetch(`http://localhost:3000/api/task/edittask/${editTask._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editTask),
        });
        if (response.ok) {
            fetchTasks();
            setIsEditing(false);
            setEditTask(null);
        }
    };

    const handleDelete = async (taskId) => {
        const response = await fetch(`http://localhost:3000/api/task/deletetask/${taskId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            fetchTasks();
        }
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        applyFilters();
    }, [filter, tasks, userFilter, priorityFilter, timeFilter, statusFilter, currentPage]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return "bg-red-500";
            case "Medium":
                return "bg-yellow-500";
            case "Low":
                return "bg-green-500";
            default:
                return "bg-gray-200";
        }
    };

    return (
        <div className="flex justify-center overflow-auto min-h-screen">
            <div className="w-3/4 p-4">
                <div className="flex justify-between mb-4">
                    <div className="space-x-2">
                        <button
                            className={`px-4 py-2 ${filter === 'priority' ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setFilter("priority")}
                        >
                            By Priority
                        </button>
                        <button
                            className={`px-4 py-2 ${filter === 'time' ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setFilter("time")}
                        >
                            By Time
                        </button>
                        <button
                            className={`px-4 py-2 ${filter === 'user' ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setFilter("user")}
                        >
                            By User
                        </button>
                        <button
                            className={`px-4 py-2 ${filter === 'status' ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setFilter("status")}
                        >
                            By Status
                        </button>
                    </div>

                    <div className="flex space-x-4">
                        {filter === 'priority' && (
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="p-2 bg-white text-black"
                            >
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        )}
                        {filter === 'time' && (
                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                                className="p-2 bg-white text-black"
                            >
                                <option value="">Select Time</option>
                                <option value="soon">Due Soon</option>
                                <option value="later">Due Later</option>
                            </select>
                        )}
                        {filter === 'user' && (
                            <select
                                value={userFilter}
                                onChange={(e) => setUserFilter(e.target.value)}
                                className="p-2 bg-white text-black"
                            >
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user._id} value={user.name}>{user.name}</option>
                                ))}
                            </select>
                        )}
                        {filter === 'status' && (
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="p-2 bg-white text-black"
                            >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In-progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        )}
                    </div>
                </div>

                <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>

                {isEditing ? (
                    <div>
                        <h2 className="text-xl font-semibold">Edit Task</h2>
                        <form>
                            <input
                                type="text"
                                value={editTask.title}
                                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                                className="p-2 border mb-2 w-full"
                                placeholder="Task Title"
                            />
                            <textarea
                                value={editTask.description}
                                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                                className="p-2 border mb-2 w-full"
                                placeholder="Task Description"
                            ></textarea>
                            <input
                                type="date"
                                value={editTask.dueDate ? new Date(editTask.dueDate).toISOString().split("T")[0] : ""}
                                onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                                className="p-2 border mb-2 w-full"
                            />
                            <select
                                value={editTask.priority}
                                onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                                className="p-2 border mb-2 w-full"
                            >
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <label className="block mb-2 font-semibold">Assign Users</label>
                            <select
                                value={editTask.assignedTo.map((user) => user._id)}
                                onChange={(e) =>
                                    setEditTask({
                                        ...editTask,
                                        assignedTo: Array.from(e.target.selectedOptions).map((option) => ({
                                            _id: option.value,
                                            name: option.text,
                                        })),
                                    })
                                }
                                className="p-2 border mb-2 w-full"
                            >
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={handleEditSave}
                                    className="px-4 py-2 bg-blue-500 text-white"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-500 text-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                    </div>
                ) : (
                    isSelected ? (
                        <div>
                            <h2 className="text-xl font-semibold">Task Details</h2>
                            <div className="p-4 rounded-lg shadow-md bg-gray-200 text-black">
                                <h3 className="text-xl font-semibold">{selectedTask.title}</h3>
                                <p className="text-sm">
                                    {selectedTask.description}
                                </p>
                                <p className="mt-2">Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                                <p className="mt-2">Status: {selectedTask.status}</p>
                                <p className="mt-2">Priority: {selectedTask.priority}</p>
                                <p className="mt-2">Assigned To: {selectedTask.assignedTo.map(user => user.name).join(", ")}</p>
                                <div className="mt-2 space-x-2">
                                    <button
                                        onClick={() => setIsSelected(false)}
                                        className="px-2 py-2 bg-blue-500 text-white"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentTasks.map((task) => (
                                    <div
                                        key={task._id}
                                        className={`p-4 rounded-lg shadow-md ${getPriorityColor(task.priority)} text-white`}
                                    >
                                        <h3 className="text-xl font-semibold">{task.title}</h3>
                                        <p className="text-sm">
                                            {task.description.split(" ").slice(0, 5).join(" ")}...
                                        </p>
                                        <p className="mt-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                        <p className="mt-2">Status: {task.status}</p>
                                        <p className="mt-2">Priority: {task.priority}</p>
                                        <div className="mt-2 space-x-2">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="px-2 py-2 bg-blue-500 text-white"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="px-2 py-2 bg-blue-500 text-white"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleView(task._id)}
                                                className="px-2 py-2 bg-blue-500 text-white"
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-x-2 text-white flex justify-center mt-4 ">
                                {totalPages <= 5 ? (
                                    [...Array(totalPages).keys()].map(page => (
                                        <button
                                            key={page + 1}
                                            onClick={() => handlePageChange(page + 1)}
                                            className={`px-4 py-2 ${currentPage === page + 1 ? 'bg-black' : 'bg-gray-300'}`}
                                        >
                                            {page + 1}
                                        </button>
                                    ))
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handlePageChange(1)}
                                            className={`px-4 py-2 ${currentPage === 1 ? 'bg-black' : 'bg-gray-300'}`}
                                        >
                                            1
                                        </button>
                                        {currentPage > 3 && (
                                            <span className="px-4 py-2">...</span>
                                        )}
                                        {[...Array(5).keys()].map((page) => {
                                            const pageNumber = page + currentPage - 2;
                                            return (
                                                pageNumber > 1 && pageNumber < totalPages && (
                                                    <button
                                                        key={pageNumber}
                                                        onClick={() => handlePageChange(pageNumber)}
                                                        className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-blue-500' : 'bg-gray-300'}`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                )
                                            );
                                        })}
                                        <button
                                            onClick={() => handlePageChange(totalPages)}
                                            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-blue-500' : 'bg-gray-300'}`}
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )

                )}
            </div>
        </div>
    );
};

export default AllTasks;
