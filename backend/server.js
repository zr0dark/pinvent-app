const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const contactRoute = require('./routes/contactRoute.js')
const errorHandler = require('./middleware/errorMiddleware.js')
const cookieParser = require('cookie-parser')
const path = require('path')

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes Middleware
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/contactus', contactRoute)

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
