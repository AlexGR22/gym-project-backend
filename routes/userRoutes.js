import express from 'express'
import {check} from 'express-validator'
import {checkRole} from '../middlewares/roleAuth.js'
import { 
    registerUser, 
    getUsers, 
    getUser, 
    updateUser, 
    updateUserSubscription, 
    deleteUser, 
    userValidation 
} from '../controllers/userController.js'

const router = express.Router()

router.post('/register', registerUser)

router.post('/users/validation',
    [
        check('password').isLength({ min: 2 }),
        check('email').isEmail()
    ],
    userValidation
);

router.get('/users', getUsers )

router.get('/users/:id', getUser )

router.put('/update/:id', updateUser )

router.put('/update/subscription/:id', updateUserSubscription )

router.delete('/delete/:id', deleteUser )

export default router
