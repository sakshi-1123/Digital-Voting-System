const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Route to get voters list
app.get('/api/voters', (req, res) => {
    db.query('SELECT * FROM voters', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(Server running at http://localhost:${port});
});

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Default XAMPP user
    password: '',       // Empty by default
    database: 'digital_voting'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;

{
    "name": "digital-voting",
        "version": "1.0.0",
            "main": "server.js",
                "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "cors": "^2.8.5",
            "express": "^4.18.2",
                "mysql": "^2.18.1"
    }
}