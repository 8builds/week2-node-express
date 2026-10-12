const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

// Custom middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve the static HTML page
app.use(express.static(path.join(__dirname, 'public')));

// GET /
app.get('/', (req, res) => {
    res.send('My Week 2 API!');
});

// POST /user
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required'
        });
    }

    res.json({ message: `Hello, ${name}!` });
});

// GET /user/:id
app.get('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} profile`);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
