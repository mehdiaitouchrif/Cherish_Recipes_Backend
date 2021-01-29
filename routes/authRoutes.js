import express from 'express'
import {
	forgotPassword,
	getCurrentUser,
	updateDetails,
	updatePassword,
	resetPassword,
	signIn,
	signUp,
	logout,
	deleteAccount,
	confirmEmail,
	sendConfirmationEmail,
} from '../controllers/authController.js'
import requireAuth from '../middleweare/requireAuth.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/me', requireAuth, getCurrentUser)
router.get('/logout', requireAuth, logout)
router.put('/updatedetails', requireAuth, updateDetails)
router.put('/updatepassword', requireAuth, updatePassword)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)
router.post('/sendconfirmationemail/', requireAuth, sendConfirmationEmail)
router.put('/confirmemail/:confirmationtoken', confirmEmail)
router.delete('/deleteAccount', requireAuth, deleteAccount)

export default router
