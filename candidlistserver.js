const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'your_secret_key'; // Use env vars in production

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // set your DB password
    database: 'voting_db' // replace with your database name
});

// Test DB connection
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

// --- ROUTES ---

// 1. Get Voter List
app.get('/voter_list/voters', (req, res) => {
    const sql = "SELECT USN, NAME, SECTION, BRANCH FROM voters";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Voter Login
app.post('/login', (req, res) => {
    const { voterId, password } = req.body;
    const sql = "SELECT * FROM voters WHERE USN = ?";
    db.query(sql, [voterId], async (err, results) => {
        if (err || results.length === 0)
            return res.status(401).json({ message: "Invalid Voter ID or Password" });

        const voter = results[0];
        const match = await bcrypt.compare(password, voter.PASSWORD);
        if (!match) return res.status(401).json({ message: "Invalid Voter ID or Password" });

        const token = jwt.sign({ voterId: voter.USN }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Middleware to protect vote route
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return res.sendStatus(403);

    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.voterId = decoded.voterId;
        next();
    });
}

// 3. Vote for a Candidate
app.post('/vote', verifyToken, (req, res) => {
    const { candidateId } = req.body;
    const voterId = req.voterId;

    // Optional: Check if already voted
    const checkSql = "SELECT * FROM votes WHERE voter_id = ?";
    db.query(checkSql, [voterId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) return res.status(400).json({ message: "You have already voted" });

        // Record vote
        const insertSql = "INSERT INTO votes (voter_id, candidate_id) VALUES (?, ?)";
        db.query(insertSql, [voterId, candidateId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Vote successfully recorded" });
        });
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/voter_list/voters`);
});
