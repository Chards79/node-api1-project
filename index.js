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

// GET all users

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.log('error on get for all users', error)
            res.status(500).json({ error: 'The users information could not be retrieved' })
        })
})

// GET user by id

server.get('/api/users/:id', (req, res) => {

    const id = req.body;

    if (id === id) {
        db.findById(id)
            .then(users => {
                res.status(200).json(users);
            })
            .catch(error => {
                console.log('error on get user by id', error)
                res.status(500).json({ error: 'The user information could not be retrieved' })
            })
    } else {
        res.status(404).json({ errorMessage: 'Not Found' })
    }
})

// DELETE user by id



const port = 3000;
server.listen(port, () =>
    console.log(`\n ** API running on port ${port} **\n`)
);