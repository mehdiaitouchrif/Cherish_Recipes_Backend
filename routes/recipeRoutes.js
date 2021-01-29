import express from 'express'
import {
	createRecipe,
	deleteRecipe,
	getRecipe,
	getRecipes,
	updateRecipe,
} from '../controllers/recipeController.js'
import requireAuth from '../middleweare/requireAuth.js'

const router = express.Router({ mergeParams: true })

router.route('/').post(requireAuth, createRecipe).get(getRecipes)
router
	.route('/:id')
	.get(getRecipe)
	.put(requireAuth, updateRecipe)
	.delete(requireAuth, deleteRecipe)

export default router
