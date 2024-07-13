const bookModel = require('../models/bookModel');
const userModel = require('../models/userModel');
const { userData, bookData } = require('../data/bookData');

// Get all book data
const getAllBookData = async (req, res) => {
    try {
        let books = await bookModel.find();
        if (books.length === 0) {
            await bookModel.insertMany(bookData);
            books = await bookModel.find(); // Fetch books again to include newly inserted data
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new book data
const addNewBookData = async (req, res) => {
    const newBook = req.body;
    try {
        const existingBook = await bookModel.findOne({ isbn: newBook.isbn });
        if (existingBook) {
            return res.status(409).json({ message: `A book with ISBN ${newBook.isbn} already exists` });
        }
        const insertedBook = await bookModel.create(newBook);
        res.status(201).json(insertedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get book data by ISBN
const getBookDataByIsbn = async (req, res) => {
    const ISBNtoFetch = req.params.isbn;
    try {
        const expectedBookData = await bookModel.findOne({ isbn: ISBNtoFetch });
        if (expectedBookData) {
            return res.status(200).json(expectedBookData);
        }
        return res.status(404).json({ message: `No book was found with ISBN ${ISBNtoFetch}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update book data
const updateBookData = async (req, res) => {
    const isbn = req.params.isbn;
    const bookToBeUpdated = req.body;
    try {
        const updatedBook = await bookModel.findOneAndUpdate({ isbn: isbn }, bookToBeUpdated, { new: true });
        if (updatedBook) {
            return res.status(200).json({ message: 'Updated Successfully', updatedBook });
        } else {
            return res.status(404).json({ message: 'No book found with the given ISBN' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete book data
const deleteBookData = async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const deletedBook = await bookModel.findOneAndDelete({ isbn: isbn });
        if (deletedBook) {
            return res.status(200).json({ message: 'Deleted Successfully' });
        } else {
            return res.status(404).json({ message: 'No book found with the given ISBN' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all user data
const getAllUserData = async (req, res) => {
    try {
        let users = await userModel.find();
        if (users.length === 0) {
            await userModel.insertMany(userData);
            users = await userModel.find(); // Fetch users again to include newly inserted data
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Register a new user
const registerNewUser = async (req, res) => {
    const newUserData = req.body;
    try {
        const existingUser = await userModel.findOne({ uname: newUserData.uname });
        if (existingUser) {
            return res.status(409).json({ message: `A user with username ${newUserData.uname} already exists` });
        }
        const insertedUser = await userModel.create(newUserData);
        res.status(201).json(insertedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Authenticate user
const authUser = async (req, res) => {
    const uname = req.params.uname;
    const upwd = req.params.upwd;
    try {
        const expectedUser = await userModel.findOne({ uname: uname });
        if (!expectedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (upwd !== expectedUser.upwd) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        return res.status(200).json({ message: 'Authentication Successful', user: expectedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const uname = req.params.uname;
    const upwd = req.params.upwd;
    try {
        const deletedUser = await userModel.findOneAndDelete({ uname: uname, upwd: upwd });
        if (deletedUser) {
            return res.status(200).json({ message: 'Deleted Successfully' });
        } else {
            return res.status(404).json({ message: 'Invalid Username or Password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBookData,
    addNewBookData,
    getBookDataByIsbn,
    updateBookData,
    deleteBookData,
    getAllUserData,
    registerNewUser,
    authUser,
    deleteUser
};