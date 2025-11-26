const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a menu item name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['appetizers', 'main-course', 'desserts', 'beverages', 'specials']
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isVegetarian: {
        type: Boolean,
        default: false
    },
    isSpicy: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5
    },
    prepTime: {
        type: Number,
        default: 20
    },
    quantity: {
        type: Number,
        default: 50,
        min: 0
    },
    servingSize: {
        type: String,
        default: 'Full Plate'
    },
    sizes: [{
        name: { type: String },
        price: { type: Number }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
