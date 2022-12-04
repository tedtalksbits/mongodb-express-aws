import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: Object,
        required: true,
        default: {
            value: '',
            createdAt: Date.now(),
            lastUpdatedAt: Date.now(),
            incorrectTries: 0,
            locked: false,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
    avatar: {
        type: String,
        default:
            'https://robohash.org/' +
            Math.random() +
            '.png?size=200x200&set=set1',
    },
    idType: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    idExpirationDate: {
        type: Date,
        required: true,
    },
    idImage: {
        type: String,
        required: true,
    },
    address: {
        type: Object,
        required: true,
        default: {
            street: '',
            city: '',
            state: '',
            zip: '',
        },
    },
    phone: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    ssn: {
        type: String,
        required: true,
    },
    ssnImage: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    suffix: {
        type: String,
    },
});

export default mongoose.model('User', userSchema);
