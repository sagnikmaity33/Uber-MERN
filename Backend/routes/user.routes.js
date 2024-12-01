const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const userController = require("../controllers/user.controller")

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min : 3}).withMessage('First name must be at least 3 characters'),
    body('password').isLength({ min : 8}).withMessage('Password must be at least 8 characters'),
    // body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords must match')
],
    userController.registerUser
)


module.exports = router;