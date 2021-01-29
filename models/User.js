import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please add your first name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please add your last name'],
		},
		email: {
			type: String,
			required: [true, 'Please add your email'],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email',
			],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
		},
		averageRating: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [5, 'Rating cannot be more than 5'],
		},
		photo: {
			type: String,
			required: true,
			default: '/images/user.jpg',
		},
		favoriteRecipes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Recipe',
			},
		],
		resetPasswordToken: String,
		resetPasswordExpire: Date,
		confirmEmailToken: String,
		isEmailConfirmed: {
			type: Boolean,
			default: false,
		},
		toFactorCode: String,
		twoFactorCodeExpire: Date,
		twoFactorEnable: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

// Hash password before saving it in databse
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	})
}

// Match Passwords
userSchema.methods.matchPasswords = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// Create model
const User = mongoose.model('User', userSchema)

export default User
