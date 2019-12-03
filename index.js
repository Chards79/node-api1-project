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

    const id = req.params.id;
    console.log(id);
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
        res.status(404).json({ errorMessage: 'The user with the specified ID does not exist' })
    }
})

// DELETE user by id

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'user removed successfully', removed });
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            }
        })
        .catch(error => {
            console.log('error on DELETE /api/users/:id', error);
            res.status(500).json({ errorMessage: 'The user could not be removed' })
        })
})

// 

const port = 3000;
server.listen(port, () =>
    console.log(`\n ** API running on port ${port} **\n`)
);