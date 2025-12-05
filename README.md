# 🚀 CodeJudge – Online Coding Practice & Evaluation Platform  
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express&logoColor=white) 
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white) 
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## ✨ Overview

**CodeJudge** is a full-stack coding evaluation platform where users can  
✔ Solve coding problems  
✔ Run code and view live output  
✔ Track submission history  
While **admins** can fully manage problems and review all submissions.

Built using  
- **React + TailwindCSS** (Frontend)  
- **Node.js + Express** (Backend)  
- **MongoDB + Mongoose** (Database)  
- **JWT Authentication**  

---

## 🧩 Features

### 👨‍💻 User Features
- Browse all coding problems
- Submit code for evaluation
- Get output with passed/failed testcases
- View personal submission history

### 🛠 Admin Features
- Add new problems
- Edit existing problems
- View submissions for each problem
- Full platform access via JWT role access

---

## 🏗️ Tech Stack

| Layer | Technologies |
|------|--------------|
| **Frontend** | React, TailwindCSS, Axios, React Router |
| **Backend** | Node.js, Express.js, JWT, Mongoose |
| **Database** | MongoDB |
| **Other** | Code execution engine, bcrypt, dotenv |

---

## 🚀 Running the Project

### 🛠 Backend Setup

```
cd backend
npm install
npm start
```
Create a .env file inside the backend folder:
```
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret
API_KEY=your_judge0_api_key
```
### 🎨 Frontend Setup
```
cd frontend
npm install
npm run dev
```

## 🔮 Future Enhancements

- Leaderboard system
- Multi-language support (C++, Java, Python)
- AI-powered explanations
- Add code editor themes
- Add timed contests
