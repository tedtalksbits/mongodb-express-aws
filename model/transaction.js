// create a schema for a transaction

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    merchant: {
        type: Object,
        default: {
            name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            logo: '',
        },
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    posted_date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        default: 'purchase',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    description: {
        type: String,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
});

export default mongoose.model('Transaction', transactionSchema);
