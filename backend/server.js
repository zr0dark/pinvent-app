const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const userRoute = require('./routes/userRoute')
const errorHandler = require('./middleware/errorMiddleware.js')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes Middleware
app.use('/api/users', userRoute)

// Routes
app.get('/', (req, res) => {
    res.send('Home Page')
})

// Error Middleware
app.use(errorHandler)

// Connect to the database and start the server
const PORT = process.env.PORT || 5001
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))
