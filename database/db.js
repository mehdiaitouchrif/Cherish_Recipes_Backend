import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const response = await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log(
			`MongoDB Connected ${response.connection.host}`.cyan.bold.underline
		)
	} catch (error) {
		console.error(`Database Error: ${error.message}`.red.bold)
	}
}

export default connectDB
