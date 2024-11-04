import mongoose from 'mongoose'
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    child: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    healthStatus: {
        conditions: [String],
        medicationSchedule: [String],
        nutritionPlan: [String],
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
    }],
});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;