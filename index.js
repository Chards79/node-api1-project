// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({ api: 'up and running' });
});

// POST to /api/users

server.post('/api/users', (req, res) => {

    const data = req.body;

    if (data.name && data.bio) {
        db.insert(data)
            .then(users => {
                res.status(201).json({ ...users, ...data })
            })
            .catch(error => {
                console.log('error on post for users', error)
                res.status(500).json({ error: 'There was an error while saving the user to the database' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user' })
    }
})





const port = 3000;
server.listen(port, () =>
    console.log(`\n ** API running on port ${port} **\n`)
);

