const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voter_list'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to MySQL database.');
});

// Login route
app.post('/voter_list/voter', (req, res) => {
    const { voterId, password } = req.body;

    connection.query('SELECT * FROM voter WHERE voterId = ? AND password = ?', [voterId, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.send('Login successful! You can now vote.');
        } else {
            res.status(401).send('Invalid voter ID or password.');
        }
    });
});

// Route to fetch candidates
app.get('/candidate_list/candidate', (req, res) => {
    connection.query('SELECT Sno, NAME FROM candidate', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}/voter_list/voter`);
});


// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}/candidate_list/candidate`);
});
