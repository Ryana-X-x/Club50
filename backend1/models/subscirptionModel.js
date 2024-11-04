import mongoose from 'mongoose'
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    plan: {
        type: String,
        enum: ['standard', 'premium'],
        default: 'standard',
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    caretakerVisits: {
        type: Number,
        default: 3,
    },
    extraVisitsCost: {
        type: Number,
        default: 599,
    },
    totalCost: {
        type: Number,
        required: true,
    },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;
