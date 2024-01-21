const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')

const contactUs = expressAsyncHandler(async (req, res) => {
    const { subject, message } = req.body
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(400)
        throw new Error('User not found, please register.')
    }

    // Validation
    if (!subject || !message) {
        res.status(400)
        throw new Error('Please add a subject and a message.')
    }
})

module.exports = {
    contactUs,
}
