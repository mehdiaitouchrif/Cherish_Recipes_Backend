import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './database/db.js'
import cookieParser from 'cookie-parser'
import errorHandler from './middleweare/errorHandler.js'

// Env config
dotenv.config()

// Connect to MongoDB Atlas
connectDB()

// Route files
import authRoutes from './routes/authRoutes.js'
import recipeRoutes from './routes/recipeRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

// Express setup
const app = express()
app.use(express.json())

// Cookie parser
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/reviews', reviewRoutes)

// Custom error middleweare
app.use(errorHandler)

// Listen
const PORT = process.env.PORT
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
	console.log(`Error: ${error.message}`.red.underline)
	// Close server & exit process
	server.close(() => process.exit(1))
})
