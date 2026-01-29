# 🗳️ Digital Voting System

A secure and user-friendly **Digital Voting System** built using **HTML, CSS, JavaScript, Node.js, Express, and MySQL**.  
This system allows voters to log in, cast their vote only once, view candidates, and see live voting results.

---

## 📌 Features

- 🔐 Secure voter login using Voter ID and password
- 🚫 **One vote per voter** (prevents duplicate voting)
- 📋 View registered voters list
- 🗳️ Vote for a candidate
- 📊 Live election results display
- 🛠️ Backend validation to ensure voting integrity
- 🌐 REST API based architecture

---

## 🧰 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Fetch API

### Backend
- Node.js
- Express.js
- MySQL
- CORS
- JSON-based REST APIs

---

## 🗂️ Project Structure

Digital-Voting-System/
│
├── frontend/
│ ├── index.html
│ ├── login.html
│ └── styles.css
│
├── backend/
│ ├── server.js
│ └── db.sql
│
├── README.md
└── package.json


---

## 🛢️ Database Schema

### 1️⃣ `voter` Table
```sql
CREATE TABLE voter (
    voterId VARCHAR(20) PRIMARY KEY,
    password VARCHAR(50),
    has_voted TINYINT(1) DEFAULT 0
);

CREATE TABLE candidate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    votes INT DEFAULT 0
);

Step 1: Clone the Repository
git clone https://github.com/your-username/digital-voting-system.git
cd digital-voting-system

Step 2: Install Backend Dependencies
npm install

Step 3: Configure Database

Create a MySQL database named voter_list

Import the SQL schema

Update database credentials in server.js

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voter_list'
});

Step 4: Start the Server
node server.js


Server will run on:

http://localhost:3000

🚀 Future Enhancements

Password hashing using bcrypt

JWT-based authentication

Admin panel for managing candidates

Result visualization using charts

Deployment on cloud platforms