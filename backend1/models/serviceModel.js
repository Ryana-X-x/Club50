import mongoose from 'mongoose'
const { Schema } = mongoose;

const ServiceSchema = new Schema({
    requestor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    notes: {
        type: String,
    },
    cost: {
        type: Number,
        default: 999,
    },
});

const Service = mongoose.model('Service', ServiceSchema);
export default Service;