# 🎓 University Maintenance Portal

A full-stack web application for managing university maintenance complaints.
Users can register, log in, and raise complaints, while admins and staff can track and manage them efficiently.

---

## 🚀 Live Demo

* 🌐 Frontend: https://university-maintenance-portal.vercel.app/
* ⚙️ Backend: https://university-maintenance-portal.onrender.com/

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Chart.js (for analytics dashboard)

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT (JSON Web Token)
* bcrypt.js (password hashing)

---

## ✨ Features

### 👤 User

* Register new account
* Login securely
* Submit complaints
* Track complaint status

### 🛠️ Staff

* View assigned complaints
* Update complaint status

### 👑 Admin

* View all complaints
* Dashboard with Pie Chart analytics
* Manage complaint status

---

## 🔐 Authentication Flow

* Users register with email & password
* Password is hashed using bcrypt
* Login generates JWT token
* Role-based access (User / Staff / Admin)

---

## 📊 Admin Dashboard

* Displays complaint statistics:

  * Pending
  * In Progress
  * Completed
* Real-time updates with Pie Chart

---

## 📁 Project Structure

maintenance-portal/
│
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── ...
│
├── backend/         # Node.js backend
│   ├── routes/
│   │   └── authRoutes.js
│   ├── models/
│   │   └── User.js
│   └── ...

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/your-username/maintenance-portal.git

### 2️⃣ Install Dependencies

#### Backend

cd backend
npm install

#### Frontend

cd frontend
npm install

---

### 3️⃣ Run Project Locally

#### Start Backend

cd backend
npm start

#### Start Frontend

cd frontend
npm start

---

## 🌍 Deployment

* Frontend deployed on Vercel
* Backend deployed on Render

---

## 📌 API Endpoints

### Auth Routes

* POST /api/auth/register → Register user
* POST /api/auth/login → Login user

---

## 🔥 Future Improvements

* Email verification system
* Forgot password feature
* Profile management
* Advanced analytics dashboard

---

## 👨‍💻 Author

* Developed by: Shalini Kushwaha

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
