const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    time: {
        type: String,
        required: [true, 'Please add a time']
    },
    guests: {
        type: Number,
        required: [true, 'Please add number of guests'],
        min: 1,
        max: 20
    },
    specialRequests: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
