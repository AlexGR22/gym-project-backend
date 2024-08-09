import User from '../models/userModel.js'
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { generarJWT, verifyJWT } from '../helpers/handleJwt.js';

const registerUser = async (req, res) => {
        if(
            !req.body.username ||
            !req.body.email ||
            !req.body.password ||
            !req.body.subscription
        ) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        
        const { username, email, password,subscription,subscriptionstatus } = req.body

    try { 
        let newUser = await User.findOne({ email });

        if(newUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        newUser = new User({ username, email, password,subscription,subscriptionstatus })

        const salt = bcrypt.genSaltSync(10);

        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        res.status(201).json(newUser)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }   
}


const userValidation = async (req, res) => {

    const { email, password } = req.body;

    const errors = validationResult(req);

    const Errormessage = 'Email or Password incorrect';
    const ErrorDataMessage = 'Error on the Database';

    if (!errors.isEmpty()) {
        console.log('Tenemos un error de validación');
        return console.log('error validacion',
            errors);
    }

    try {
        const userLogin = await User.findOne({ email });
        console.log(`2. Usuario Login: ${userLogin.email}`);
        console.log(userLogin);
        
        if (!userLogin) {
            return res.json({
                Errormessage
            });
        }

        const validationPass = bcrypt.compareSync(password, userLogin.password);

        if (validationPass) {
            const token = await generarJWT(userLogin);
            res.cookie('token', token, {
                httpOnly: false
            })
            return res.json({
                userLogin,
                token
              });
        } else {
            return res.status(400).send('Wrong Password');
        }


    } catch {
        return res.json('error', {
            ErrorDataMessage
        });

    }

}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(
            users
        )
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        if(
            !req.body.username || 
            !req.body.email || 
            !req.body.subscription
        ) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const { id } = req.params
        const result = await User.findByIdAndUpdate(id, req.body)

        if(!result) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).send({ message: 'User updated successfully' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const updateUserSubscription = async (req, res) => {
    try {
        if(!req.body.subscription || !req.body.subscriptionStatus) {
            return res.status(400).json({ message: 'Subscription is required' })
        }
        const { id } = req.params
        const result = await User.findByIdAndUpdate(id, req.body)
        if(!result) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).send({ message: 'Subscription updated successfully' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const result = await User.findByIdAndDelete(id)
        if(!result) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).send({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export { registerUser,userValidation, getUsers, getUser, updateUser, deleteUser, updateUserSubscription }