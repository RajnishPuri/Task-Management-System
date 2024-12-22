import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState({});
    const [filter, setFilter] = useState("priority");
    const [adminNameFilter, setAdminNameFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [timeFilter, setTimeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const navigate = useNavigate();
    const [uniqueAdmins, setUniqueAdmins] = useState([]);


    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchTasks();
        }
    }, [navigate]);

    useEffect(() => {
        const adminNames = [...new Set(tasks.map(task => task.createdBy.name))];
        setUniqueAdmins(adminNames);
    }, [tasks]);


    useEffect(() => {
        applyFilters();
    }, [adminNameFilter, priorityFilter, timeFilter, statusFilter, currentPage, filter, tasks]);

    const fetchTasks = async () => {
        const response = await fetch("http://localhost:3000/api/task/getmytasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setTasks(data);
    };


    const handleUpdateStatus = async (taskId, newStatus) => {
        const response = await fetch(`http://localhost:3000/api/task/updatetaskstatus/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus }),
        });
        const data = await response.json();
        if (data.message === "Task status updated successfully") {
            fetchTasks();
        }
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

        if (adminNameFilter) {
            filtered = filtered.filter(task => task.createdBy.name === adminNameFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter(task => task.status === statusFilter);
        }

        setFilteredTasks(filtered);
    };

    const handleView = (taskId) => {
        const task = tasks.find(task => task._id === taskId);
        setSelectedTask(task);
        setIsSelected(true);
    };

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

    const handleStatusChange = (taskId, newStatus) => {
        setTaskStatuses((prevStatuses) => ({
            ...prevStatuses,
            [taskId]: newStatus,
        }));
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                            className={`px-4 py-2 ${filter === 'admin' ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setFilter("admin")}
                        >
                            By Admin
                        </button>
                        <button
                            className={`px-4 py-2 ${filter === 'status' ? 'bg-blue-500' : 'bg-gray-300'}`}
                            onClick={() => setFilter("status")}
                        >
                            By Status
                        </button>
                    </div>
                    <div className="space-x-2 flex">
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
                            {filter === "admin" && (
                                <select
                                    value={adminNameFilter}
                                    onChange={(e) => setAdminNameFilter(e.target.value)}
                                    className="p-2 bg-white text-black"
                                >
                                    <option value="">Select Admin</option>
                                    {uniqueAdmins.map(admin => (
                                        <option key={admin} value={admin}>
                                            {admin}
                                        </option>
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
                        <div>
                            <button
                                onClick={async () => {
                                    try {
                                        await fetch(`http://localhost:3000/auth/logout`, {
                                            method: 'POST', // Assuming a POST request
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                            },
                                        });

                                        localStorage.removeItem('token');

                                        window.location.reload();
                                    } catch (error) {
                                        console.error('Logout failed:', error);
                                    }
                                }}
                                className="block bg-white w-full text-left p-2 hover:bg-gray-700"
                            >
                                Logout
                            </button>

                        </div>
                    </div>
                </div>

                {isSelected && (
                    <div className="p-4 rounded-lg shadow-md bg-white">
                        <h2 className="text-2xl font-semibold mb-4">Task Details</h2>
                        <p className="text-lg font-semibold">Title: {selectedTask.title}</p>
                        <p className="text-lg font-semibold">Description: {selectedTask.description}</p>
                        <p className="text-lg font-semibold">Due Date: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                        <p className="text-lg font-semibold">Status: {selectedTask.status}</p>
                        <p className="text-lg font-semibold">Priority: {selectedTask.priority}</p>
                        <p className="text-lg font-semibold">Created By: {selectedTask.createdBy.name}</p>
                        <button
                            onClick={() => setIsSelected(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
                        >
                            Close
                        </button>
                    </div>
                )}

                <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentTasks.length === 0 ? (
                        <p>No tasks found</p>
                    ) : (
                        currentTasks.map((task) => (
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

                                <div className="mt-4 space-x-2">
                                    <select
                                        value={taskStatuses[task._id] || task.status}
                                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                        className="p-2 bg-blue-500 text-white border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In-progress</option>
                                        <option value="completed">Completed</option>
                                    </select>

                                    {taskStatuses[task._id] && taskStatuses[task._id] !== task.status && (
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                            onClick={() => handleUpdateStatus(task._id, taskStatuses[task._id])}
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleView(task._id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
                                >
                                    View
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-center mt-4">
                    <div className="space-x-2 text-white">
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
                                {[...Array(5).keys()].map((page) => (
                                    <button
                                        key={page + currentPage - 2}
                                        onClick={() => handlePageChange(page + currentPage - 2)}
                                        className={`px-4 py-2 ${currentPage === page + currentPage - 2 ? 'bg-blue-500' : 'bg-gray-300'}`}
                                    >
                                        {page + currentPage - 2}
                                    </button>
                                ))}
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
            </div>
        </div>
    );
};

export default UserDashBoard;
