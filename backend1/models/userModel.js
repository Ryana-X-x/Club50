import mongoose from 'mongoose'
const { Schema } = mongoose;
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['child', 'parent'],
        default: 'parent',
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    geoLocation: {
        type: String,
        default: 'N/A',
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"]
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
});

const User= mongoose.model('User', UserSchema);
export default User;
