
import { useEffect, useMemo, useState } from "react";
import {
  CheckSquare,
  LayoutDashboard,
  ListTodo,
  Clock,
  CheckCircle2,
  Plus,
  Search,
  LogOut,
  CalendarDays,
  Pencil,
  Trash2,
  X,
  AlertCircle,
  RefreshCw
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api";
import VideoBackground from "../components/VideoBackground";

const initialForm = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: ""
};

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setError("");
      const response = await API.get("/tasks");
      setTasks(response.data.tasks);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load tasks."
      );

      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Dashboard navigation
  const goToDashboard = () => {
    setActiveMenu("dashboard");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // My Tasks navigation
  const goToMyTasks = () => {
    setActiveMenu("tasks");

    document.getElementById("my-tasks-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  // Dashboard statistics
  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === "Pending").length,
    progress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length
  }), [tasks]);

  // Search and filter
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || task.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  // Open create form
  const openCreateModal = () => {
    setEditingTask(null);
    setForm(initialForm);
    setShowModal(true);
  };

  // Open edit form
  const openEditModal = (task) => {
    setEditingTask(task);

    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().slice(0, 10)
        : ""
    });

    setShowModal(true);
  };

  // Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        dueDate: form.dueDate || null
      };

      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, payload);
      } else {
        await API.post("/tasks", payload);
      }

      setShowModal(false);
      setForm(initialForm);
      setEditingTask(null);

      await fetchTasks();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save task."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to delete task."
      );
    }
  };

  // Change task status
  const handleStatusChange = async (id, status) => {
    try {
      const response = await API.put(`/tasks/${id}`, { status });

      setTasks(prev =>
        prev.map(task =>
          task._id === id ? response.data.task : task
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to update status."
      );
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "No deadline";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <VideoBackground>
      <div className="dashboard-layout" id="dashboard-top">

        {/* SIDEBAR */}
        <aside className="sidebar">

          <div className="dashboard-brand">
            <CheckSquare size={30} />
            <span>TaskFlow</span>
          </div>

          <p className="sidebar-label">WORKSPACE</p>

          {/* DASHBOARD BUTTON */}
          <div
            className={`sidebar-link ${activeMenu === "dashboard" ? "active" : ""}`}
            onClick={goToDashboard}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </div>

          {/* MY TASKS BUTTON */}
          <div
            className={`sidebar-link ${activeMenu === "tasks" ? "active" : ""}`}
            onClick={goToMyTasks}
          >
            <ListTodo size={19} />
            My Tasks
          </div>

          <div className="sidebar-bottom">

            <div className="user-profile">

              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="user-info">
                <strong>{user?.name || "User"}</strong>
                <span>TaskFlow Member</span>
              </div>

            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dashboard-main">

          <header className="dashboard-header">

            <div>
              <span className="welcome-label">
                YOUR PRODUCTIVITY SPACE
              </span>

              <h1>Dashboard</h1>

              <p>
                Welcome back, {user?.name || "User"}! Here's your
                task overview.
              </p>
            </div>

            <button
              className="add-task-button"
              onClick={openCreateModal}
            >
              <Plus size={19} />
              Add New Task
            </button>

          </header>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="dashboard-error">
              <AlertCircle size={18} />
              {error}

              <button onClick={() => setError("")}>
                <X size={16} />
              </button>
            </div>
          )}

          {/* STATISTICS */}
          <section className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon orange">
                <ListTodo size={23} />
              </div>
              <span>Total Tasks</span>
              <h2>{stats.total}</h2>
              <small>All your tasks</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">
                <Clock size={23} />
              </div>
              <span>Pending</span>
              <h2>{stats.pending}</h2>
              <small>Waiting to start</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                <RefreshCw size={23} />
              </div>
              <span>In Progress</span>
              <h2>{stats.progress}</h2>
              <small>Currently working</small>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <CheckCircle2 size={23} />
              </div>
              <span>Completed</span>
              <h2>{stats.completed}</h2>
              <small>Successfully finished</small>
            </div>

          </section>

          {/* TASK SECTION */}
          <section
            className="task-section"
            id="my-tasks-section"
          >

            <div className="task-section-header">

              <div>
                <h2>My Tasks</h2>
                <p>Manage and track your daily activities.</p>
              </div>

              <button
                className="refresh-button"
                onClick={fetchTasks}
                title="Refresh tasks"
              >
                <RefreshCw size={17} />
              </button>

            </div>

            {/* SEARCH AND FILTER */}
            <div className="task-controls">

              <div className="search-box">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search your tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Tasks</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

            </div>

            {/* TASK LIST */}
            {loading ? (
              <div className="empty-state">
                Loading your tasks...
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty-state">

                <ListTodo size={45} />

                <h3>No tasks found</h3>

                <p>
                  {search || filter !== "All"
                    ? "Try changing your search or filter."
                    : "Create your first task to get started."}
                </p>

                {!search && filter === "All" && (
                  <button
                    className="add-task-button"
                    onClick={openCreateModal}
                  >
                    <Plus size={18} />
                    Create Task
                  </button>
                )}

              </div>
            ) : (
              <div className="tasks-grid">

                {filteredTasks.map(task => (
                  <article className="task-card" key={task._id}>

                    <div className="task-card-top">

                      <span className={`priority ${task.priority.toLowerCase()}`}>
                        {task.priority} Priority
                      </span>

                      <div className="task-actions">

                        <button
                          onClick={() => openEditModal(task)}
                          title="Edit task"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(task._id)}
                          title="Delete task"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </div>

                    <h3>{task.title}</h3>

                    <p className="task-description">
                      {task.description || "No description provided."}
                    </p>

                    <div className="task-card-bottom">

                      <div className="task-date">
                        <CalendarDays size={15} />
                        {formatDate(task.dueDate)}
                      </div>

                      <select
                        className={`status-select ${task.status.toLowerCase().replace(" ", "-")}`}
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>

                    </div>

                  </article>
                ))}

              </div>
            )}

          </section>

          <footer className="dashboard-footer">
            Made for better productivity with TaskFlow.
          </footer>

        </main>

        {/* CREATE / EDIT TASK MODAL */}
        {showModal && (
          <div
            className="modal-backdrop"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >

            <form
              className="task-modal"
              onSubmit={handleSubmit}
            >

              <div className="modal-header">

                <div>
                  <h2>
                    {editingTask ? "Edit Task" : "Create New Task"}
                  </h2>

                  <p>Enter the details of your task.</p>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setShowModal(false)}
                >
                  <X size={21} />
                </button>

              </div>

              <label>Task Title *</label>

              <input
                type="text"
                placeholder="Enter task title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
                maxLength={120}
              />

              <label>Description</label>

              <textarea
                placeholder="Describe your task..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
              />

              <div className="modal-row">

                <div>
                  <label>Priority</label>

                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label>Status</label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

              </div>

              <label>Due Date</label>

              <input
                type="date"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
              />

              <div className="modal-buttons">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingTask
                    ? "Update Task"
                    : "Create Task"}
                </button>

              </div>

            </form>

          </div>
        )}

      </div>
    </VideoBackground>
  );
}

export default Dashboard;
