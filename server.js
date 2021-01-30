import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import expressMongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'
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
import uploadRoutes from './routes/uploadRoutes.js'

// Express setup
const app = express()
app.use(express.json())

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Cookie parser
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Sanitize data
app.use(expressMongoSanitize())

// Set security header
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Allow cross-origin requests
app.use(cors())

// Rate limit
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 200,
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Mount routers
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/reviews', reviewRoutes)
app.use('/api/v1/upload', uploadRoutes)

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
