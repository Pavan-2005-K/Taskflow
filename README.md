
# 🚀 TaskFlow – Task Management Application

TaskFlow is a modern task management web application designed to help users organize their daily activities, manage priorities, track progress, and improve productivity.

It provides a clean dashboard where users can create, update, delete, search, and manage their tasks efficiently.

---

## ✨ Features

### 🔐 User Authentication
- User registration and login.
- Secure authentication.
- Protected user-specific task management.
- Logout functionality.

### 📊 Dashboard
- View total tasks.
- Track pending tasks.
- Monitor tasks in progress.
- View completed tasks.
- Get an overview of productivity.

### 📝 Task Management
- Create new tasks.
- Edit existing tasks.
- Delete tasks.
- Update task status.
- Set task priorities.
- Add task descriptions.
- Set due dates.

### 🔎 Search & Filtering
- Search tasks by title.
- Search tasks by description.
- Filter tasks by status.
- View all tasks in one place.

### 🎨 User Interface
- Modern and responsive dashboard.
- Sidebar navigation.
- Glassmorphism-inspired UI.
- Animated video background.
- Interactive task cards.
- Clean and user-friendly design.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Lucide React
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- JavaScript
- REST API
- JWT Authentication

### Database
- MongoDB

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman

---

## 📁 Project Structure

```text
Task-Management-App/
│
├── frontend/
│   ├── public/
│   │   └── videos/
│   │       └── taskflow-background.mp4
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

*Note: The structure above illustrates the main project areas. Actual folders may differ.*

---

## ⚙️ Installation & Setup

Follow these steps to run TaskFlow locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Pavan-2005-K/Taskflow.git
```

### 2. Navigate to the Project

```bash
cd Taskflow
```

### 3. Setup Backend

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder.

Add your required environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the example values with your actual configuration.

Start the backend:

```bash
npm run dev
```

### 4. Setup Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

### 5. Open the Application

Open the local URL displayed by Vite in your browser. It is usually:

```text
http://localhost:5173
```

---

## 📌 Task Status

TaskFlow supports three task statuses:

| Status | Description |
|---|---|
| Pending | Tasks waiting to be started |
| In Progress | Tasks currently being worked on |
| Completed | Successfully finished tasks |

## 🎯 Task Priority

| Priority | Description |
|---|---|
| Low | Less urgent tasks |
| Medium | Normal priority tasks |
| High | Important and urgent tasks |

---

## 🔒 Security

- Environment variables are excluded from Git.
- Authentication is handled using JWT.
- Protected API routes help restrict unauthorized access.
- User-specific task data is managed through the backend.

---

## 🚀 Future Enhancements

- Calendar-based task management.
- Task deadline reminders.
- Task analytics and productivity charts.
- Drag-and-drop task organization.
- Dark and light themes.
- Email notifications.
- Team collaboration.

---

## 👨‍💻 Developer

**Pavan K**

GitHub: [Pavan-2005-K](https://github.com/Pavan-2005-K)

Project: [TaskFlow Repository](https://github.com/Pavan-2005-K/Taskflow)

---

## 📄 License

This project is developed for educational and learning purposes.

---

⭐ If you find this project useful, consider giving it a star on GitHub!

**TaskFlow – Plan Better. Work Smarter. Achieve More.**
