# 🗂️ Task Tracker App

A simple and responsive **Task Tracker Web Application** built using **HTML, CSS, and JavaScript**.  
This project helps users organize tasks by priority, schedule tasks with date & time, and track completed tasks with a temporary trash/recycle system.

---

## ✨ Features

- ➕ Add new tasks easily
- 🎯 Set task priority (Low, Medium, High)
- ⏰ Schedule tasks with date & time
- 📋 View all active tasks in a dynamic list
- ✔️ Mark tasks as finished
- 🗑️ View recently completed tasks in a trash modal
- ⏳ Auto-delete trash items after 7 days
- 💾 Persistent data using Local Storage (no backend required)

---

## 🧠 How It Works

- Tasks are stored in the browser using **LocalStorage**
- When a task is added, it is instantly displayed in the task list
- Finished tasks are moved to a “Trash” section instead of being permanently deleted
- Trash items automatically expire after 7 days
- Scheduled tasks display formatted date and time for readability

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage API
