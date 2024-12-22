const express = require('express');
const app = express();
const mongoDb = require('./Db');
const User = require('./models/user');
const bodyParser = require('body-parser')
const cors  = require('cors')
mongoDb();

app.use(cors())

// Middleware to parse JSON requests

app.use(express.static('public'));
app.use(bodyParser.json())


// CREATE: Create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', data: savedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving user', error: err.message });
    }
});

// READ: Get a user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
});

// READ: Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
});

// UPDATE: Update a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
});

// DELETE: Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
