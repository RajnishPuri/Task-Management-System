import { useState } from "react";
import AllTasks from "../components/AllTasks";
import CreateTask from "../components/CreateTask";
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("all-tasks");

    return (
        <div className="flex h-screen">
            <nav className="w-1/6 bg-gray-800 text-white p-4 space-y-4">
                <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
                <button
                    onClick={() => setActiveTab("all-tasks")}
                    className={`block w-full text-left p-2 rounded ${activeTab === "all-tasks" ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}
                >
                    All Tasks
                </button>
                <button
                    onClick={() => setActiveTab("create-task")}
                    className={`block w-full text-left p-2 rounded ${activeTab === "create-task" ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}
                >
                    Create Task
                </button>
                <button
                    onClick={async () => {
                        try {
                            await fetch(`http://localhost:3000/auth/logout`, {
                                method: 'POST',
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
                    className="block w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Logout
                </button>

            </nav>

            <div className="w-full p-6 overflow-y-auto ">
                {activeTab === "all-tasks" && <AllTasks />}
                {activeTab === "create-task" && <CreateTask />}
            </div>
        </div>
    );
};

export default AdminDashboard;
