const express = require('express');
const router = express.Router();

// Import functions from controllers
const {
    getAllBookData,
    getBookDataByIsbn,
    addNewBookData,
    updateBookData,
    deleteBookData,
    getAllUserData,
    registerNewUser,
    authUser,
    deleteUser
} = require('../controllers/bookController');

// Define routes
router.get('/getAllBookData', getAllBookData);
router.get('/getBookDataByIsbn/:isbn', getBookDataByIsbn);
router.post('/addNewBookData', addNewBookData);
router.put('/updateBookData/:isbn', updateBookData);
router.delete('/deleteBookData/:isbn', deleteBookData);
router.get('/getAllUserData', getAllUserData);
router.post('/registerNewUser', registerNewUser);
router.get('/authUser/:uname/:upwd', authUser);
router.delete('/deleteUser/:uname/:upwd', deleteUser);

module.exports = router;