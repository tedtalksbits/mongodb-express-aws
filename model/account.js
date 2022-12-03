// create a schema for a bank account

import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    points: {
        type: Number,
        default: 0,
    },
    cardInfo: {
        type: Object,
        default: {
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            nameOnCard: '',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

export default mongoose.model('Account', accountSchema);
