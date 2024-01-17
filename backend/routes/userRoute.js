const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
} = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

// Routes to particular functionality. 'protect' means that the route is protected so that only registered users have access to the route.
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/getuser', protect, getUser)
router.get('/loggedin', loginStatus)
router.patch('/updateuser', protect, updateUser)
router.patch('/changepassword', protect, changePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken', resetPassword)

module.exports = router
