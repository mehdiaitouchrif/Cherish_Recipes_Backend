import mongoose from 'mongoose'

const recipeSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Please give the recipe a name'],
		},
		description: {
			type: String,
			required: [true, 'Please give the recipe a description'],
			maxlength: [300, 'Description can not be more than 300 characters'],
		},
		images: {
			type: [String],
			required: [true, 'Please add at least 1 image'],
		},
		cuisine: {
			type: String,
			required: [true, 'Please select an appropriate cuisine for your recipe'],
			enum: [
				'France',
				'Italy',
				'China',
				'United States',
				'Thailand',
				'Japan',
				'India',
				'Turkey',
				'Spain',
				' Mexico',
				'Morocco',
			],
		},
		level: {
			type: String,
			required: [true, 'Please select a level of difficulty'],
			enum: ['Easy', 'Intermediate', 'Advanced'],
		},
		prepTime: {
			type: Number,
			required: [true, 'Please enter an estimate of preparation time'],
		},
		cookTime: {
			type: Number,
			required: [true, 'Please an estimate of cook time'],
		},
		ingredients: {
			type: [String],
			required: [
				true,
				'Please add the appropriate ingredients for this recipe',
			],
		},
		steps: {
			type: [String],
			required: [true, 'Please add the necessary steps to prepare this recipe'],
		},
		averageRating: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [5, 'Rating cannot be more than 5'],
		},
	},
	{ timestamps: true }
)

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
