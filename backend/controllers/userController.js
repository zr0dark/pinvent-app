const registerUser = (req, res) => {
    if (!req.body.email) {
        res.status(400)
        throw new Error('Please add a valid email address.')
    }
    res.send('Register User')
}

module.exports = {
    registerUser,
}
