const User = require('../models/UserModel');
const Task = require('../models/TaskModel');
const mongoose = require('mongoose');

// for admin
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, assignedTo } = req.body;
        if (!title || !description || !dueDate || !priority || !assignedTo) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const createdBy = req.user._id;
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            createdBy,
            assignedTo
        });
        await task.save();
        const user = await User.findById(assignedTo);
        user.tasks.push(task._id);
        await user.save();
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, assignedTo } = req.body;

        if (!title || !description || !dueDate || !priority || !assignedTo) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.assignedTo = assignedTo;

        await task.save();
        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.isDeleted = true;
        await task.save();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id, isDeleted: false }).populate('assignedTo').exec();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tasks = await Task.find({ assignedTo: userId, isDeleted: false });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// for user
exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (!req.body.status) {
            return res.status(400).json({ message: "Task status is required." });
        }
        task.status = req.body.status;
        await task.save();
        res.json({ message: 'Task status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id, isDeleted: false }).populate('createdBy').exec();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getDedicatedTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id).populate('assignedTo').exec();
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: error.message });
    }
};

