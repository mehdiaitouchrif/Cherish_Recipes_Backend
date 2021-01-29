import express from 'express'
import {
	getCurrentUser,
	signIn,
	signUp,
} from '../controllers/authController.js'
import requireAuth from '../middleweare/requireAuth.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/me', requireAuth, getCurrentUser)
export default router
