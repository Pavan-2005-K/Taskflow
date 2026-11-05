import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required"
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      user: req.user.id
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: tasks.length,
      tasks
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.title !== undefined && !updates.title.trim()) {
      return res.status(400).json({
        message: "Task title cannot be empty"
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};