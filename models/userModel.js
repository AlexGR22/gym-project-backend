import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscription: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    subscriptionstatus: {
        type: String,
        default: 'inactive'
    },
},
    {
        timestamps: true,
    }

);

const User = mongoose.model('User', userSchema);

export default User;