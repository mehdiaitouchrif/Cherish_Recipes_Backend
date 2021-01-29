import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a title for the review'],
			maxlength: 50,
		},
		text: {
			type: String,
			required: [true, 'Please add your review text'],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, `Please add a rating between 1 and 5`],
		},
		recipe: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Recipe',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
)

const Review = mongoose.model('Review', reviewSchema)

export default Review
