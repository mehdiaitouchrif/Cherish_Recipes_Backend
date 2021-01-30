import Recipe from '../models/Recipe.js'
import asyncHandler from '../middleweare/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'
import User from '../models/User.js'

// List all recipes
// GET /api/v1/recipes | Public
// GET /api/v1/auth/:userId/recipes
export const getRecipes = asyncHandler(async (req, res) => {
	if (req.params.userId) {
		const recipes = await Recipe.find({ user: req.params.userId }).populate(
			'user',
			'firstName lastName'
		)
		res.status(200).json({
			success: true,
			count: recipes.length,
			data: recipes,
		})
	} else {
		const recipes = await Recipe.find({}).populate(
			'user',
			'firstName lastName photo'
		)

		res.json({
			success: true,
			count: recipes.length,
			data: recipes,
		})
	}
})

// List single recipe
// GET /api/v1/recipes/:id | Public
export const getRecipe = asyncHandler(async (req, res, next) => {
	const recipe = await Recipe.findById(req.params.id)

	if (recipe) {
		res.json({
			success: true,
			data: recipe,
		})
	} else {
		next(new ErrorResponse('No recipe found', 404))
	}
})

// Add favorite recipes
// PUT /api/v1/recipes/favorites/:recipeId
export const addToFavorites = asyncHandler(async (req, res, next) => {
	let user = await User.findById(req.user._id)

	const recipe = await Recipe.findById(req.params.recipeId)
	if (recipe) {
		user.favoriteRecipes.push(recipe)
		await user.save()
		res.status(200).json({
			success: true,
			data: recipe,
		})
	} else {
		next(new ErrorResponse('No recipe found', 404))
	}
})

// Create a recipe
// POST /api/v1/recipes | Require Auth
export const createRecipe = asyncHandler(async (req, res) => {
	req.body.user = req.user._id
	const recipe = await Recipe.create(req.body)

	res.status(201).json({
		success: true,
		data: recipe,
	})
})

// Update a recipe
// PUT /api/v1/recipes/:id | Require Auth
export const updateRecipe = asyncHandler(async (req, res, next) => {
	let recipe = await Recipe.findById(req.params.id)

	if (recipe) {
		if (recipe.user.toString() === req.user._id.toString()) {
			recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			})
			res.status(200).json({
				success: true,
				data: recipe,
			})
		} else {
			next(
				new ErrorResponse("You're not authorized to update this recipe", 401)
			)
		}
	} else {
		next(new ErrorResponse('No recipe found', 404))
	}
})

// Delete a recipe
// DELETE /api/v1/:id | Require Auth
export const deleteRecipe = asyncHandler(async (req, res, next) => {
	const recipe = await Recipe.findById(req.params.id)

	if (recipe) {
		if (req.user._id.toString() === recipe.user.toString()) {
			// then user owns it
			await recipe.remove()
			res.status(200).json({
				success: true,
				data: {},
			})
		} else {
			next(
				new ErrorResponse("You're not authorized to delete this recipe", 401)
			)
		}
	} else {
		next(new ErrorResponse('No recipe found', 404))
	}
})
