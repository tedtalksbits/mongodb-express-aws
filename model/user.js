import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: Object,
        required: [true, 'Password is required'],
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
    identificationType: {
        type:
            'passport' | 'driver license' | 'state id' | 'student id' | 'other',
        required: [true, 'Identification type is required'],
    },
    identificationNumber: {
        type: String,
        required: [true, 'Identification number is required'],
    },
    identificationExpirationDate: {
        type: Date,
        required: [true, 'Identification expiration date is required'],
    },
    identificationImage: {
        type: String,
        required: [true, 'Identification image is required'],
    },
    address: {
        type: Object,
        required: [true, 'Address is required'],
        default: {
            street: '',
            city: '',
            state: '',
            zip: '',
        },
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    ssn: {
        type: String,
        required: [true, 'Social security number is required'],
    },
    ssnImage: {
        type: String,
        trim: true,
    },
});

export default mongoose.model('User', userSchema);
