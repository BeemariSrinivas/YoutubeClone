# 🎬 MERN YouTube Clone

This is a full-stack YouTube clone built using the MERN stack (MongoDB, Express.js, React, Node.js). It replicates core functionalities of YouTube, including user authentication, channel creation, video upload/playback, likes/dislikes, and comments.

> 📁 GitHub Repo: [BeemariSrinivas/YoutubeClone](https://github.com/BeemariSrinivas/YoutubeClone.git)

---

## 📌 Purpose of the Project

This project was developed as a **capstone project** to demonstrate:
- Full-stack MERN development skills
- REST API design and integration
- Real-world component-based UI design in React
- Authentication and secure session handling
- MongoDB CRUD operations for videos, users, comments, and channels

---

## 🛠️ Features

- JWT-based user authentication
- Channel creation and management
- Video upload and streaming via `ReactPlayer`
- Likes/Dislikes & comment section on each video
- Filter by category & browse by channels
- Fully responsive layout

---


---

## ⚙️ Tech Stack


---

## 🧑‍💻 Tech Stack

| Layer     | Tech                           |
|-----------|--------------------------------|
| Frontend  | React, React Router, Axios     |
| Backend   | Node.js, Express.js            |
| Database  | MongoDB Compass                |
| Styling   | CSS3, Responsive Design        |
| Auth      | JWT (JSON Web Token)           |

---

## 🛠️ Local Development Setup

> ✅ Make sure MongoDB Compass is connected and ports **3300** (backend) and **5173** (frontend) are free.

### ✅ Prerequisites
- Node.js & npm
- MongoDB Compass
- Git

---

### 📦 Clone the Repo

```bash
git clone https://github.com/BeemariSrinivas/YoutubeClone.git
cd YoutubeClone

npm install

split terminal

on one terminal
npm run dev

and on other
cd backend
node index.js