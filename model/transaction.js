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
        required: [true, 'Please add a positive or negative number'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    posted_date: {
        type: Date,
        default: Date.now,
    },
    // type of transaction: 'purchase',

    type: {
        type:
            'direct deposit' |
            'transfer' |
            'interest' |
            'fee' |
            'other' |
            'zelle payment' |
            'zelle request' |
            'cash back' |
            'refund' |
            'reversal' |
            'adjustment' |
            'withdrawal',
        default: 'purchase',
    },
    createdAt: {
        type: Date,
        default: Date.now,
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
