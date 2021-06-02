const express = require('express');
 const userController= require('../controllers/user');
const authHelpers = require('../helpers/auth');

const router = express.Router();

// TASK - 4 SubTask - a.1,a.2
//Get all information from users table
router.get('/',userController.getAllUsers);

//TASK - 4 SubTask - a.3
// Get user information by username
router.get('/username/:username',userController.getUserByUsername);

//TASK - 4 SubTask - b
//Get user information by id
router.get('/userid/:id',userController.getUserById);

//TASK - 4 SubTask - c
//Login user
router.post('/login',userController.loginUser);

router.post('/register', userController.createUser);






module.exports = router;