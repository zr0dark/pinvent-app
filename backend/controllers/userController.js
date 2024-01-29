const asyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Token = require('../models/tokenModel.js')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail.js')

// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all required fields.')
    }
    if (password.length < 8) {
        res.status(400)
        throw new Error(
            'Your password must be at least 8 characters in length.'
        )
    }

    // Check if user email already exists.
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('This email address already exists in the system.')
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    })

    // Generate a token for the user
    const token = generateToken(user._id)

    // Send HTTP-only cookie
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true,
    })

    if (user) {
        const { _id, name, email } = user
        res.status(201).json({
            _id,
            name,
            email,
            token,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // Validate Request
    if (!email || !password) {
        res.status(400)
        throw new Error('Please include the correct email and password.')
    }
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error(
            'Username not found, please verify or sign up for an account.'
        )
    }

    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    // Generate a token for the user
    const token = generateToken(user._id)

    // Send HTTP-only cookie
    if (passwordIsCorrect) {
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: 'none',
            secure: true,
        })
    }

    if (user && passwordIsCorrect) {
        const { _id, name, email } = user
        res.status(200).json({
            _id,
            name,
            email,
            token,
        })
    } else {
        res.status(400)
        throw new Error(
            'Invalid login, please verify your information and try again.'
        )
    }
})

// Logout user
const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true,
    })
    return res.status(200).json({ message: 'You have logged out.' })
})

// Get user data
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        const { _id, name, email } = user
        res.status(200).json({
            _id,
            name,
            email,
        })
    } else {
        res.status(400)
        throw new Error('User not found.')
    }
})

// Get login status
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json(false)
    }
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        return res.json(true)
    }
    return res.json(false)
})

// Update user information
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        const { name, email } = user
        user.email = email
        user.name = req.body.name || name

        const updatedUser = await user.save()
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found.')
    }
})

// Change password function
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const { oldPassword, password } = req.body

    if (!user) {
        res.status(400)
        throw new Error(
            'User not found, please verify your information and try again or create an account.'
        )
    }
    // Validate
    if (!oldPassword || !password) {
        res.status(400)
        throw new Error('Please enter your old and new passwords.')
    }

    // Check if old password matches the password stored in the database.
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

    // Save new password
    if (user && passwordIsCorrect) {
        user.password = password
        await user.save()
        res.status(200).send('Your password has been successfully changed.')
    } else {
        res.status(400)
        throw new Error('Old password is incorrect.')
    }
})

// Forgot password function
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        res.status(404)
        throw new Error('User does not exist.')
    }

    // Delete a token if it exists in the database.
    let token = await Token.findOne({ userId: user._id })
    if (token) {
        await token.deleteOne()
    }

    // Create reset token
    let resetToken = crypto.randomBytes(32).toString('hex') + user._id

    // Hash the token before saving it to the database
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    // Save the new token to the database
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
    }).save()

    // Construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    // Reset email contents
    const message = `
        <h1>Password Reset Request</h1>
        <h2>Hello ${user.name},</h2>
        <p>Please use the link below to reset your password.</p>
        <p>This reset link will only be valid for 30 minutes.</p>
        <a href=${resetUrl} clicktracking=off>Click this link to reset your email.</a>
        <p>Please call or message Jason if you have any trouble with this process. Thanks!</p>
    `
    const subject = 'Password Reset Request'
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER
    const reply_to = 'noreply@StarSouthLLC.com'

    try {
        await sendEmail(subject, message, send_to, sent_from, reply_to)
        res.status(200).json({ success: true, message: 'Reset email sent.' })
    } catch (error) {
        res.status(500)
        throw new Error('Email not sent, please try again.')
    }
})

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const { resetToken } = req.params

    // Hash token, then compare it to the one in the database
    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    // Find the token in the database
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() },
    })

    if (!userToken) {
        res.status(404)
        throw new Error('Invalid or expired token.')
    }

    // Find user
    const user = await User.findOne({
        _id: userToken.userId,
    })
    user.password = password
    await user.save()
    res.status(200).json({
        message: 'Password reset successfully, please login.',
    })
})

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
}
