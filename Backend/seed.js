require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

const menuItems = [
    {
        name: 'Truffle Risotto',
        description: 'Creamy Arborio rice infused with black truffle oil, parmesan, and wild mushrooms',
        price: 28.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1476124369491-c4f1b0d36b7e?w=800',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 25
    },
    {
        name: 'Grilled Salmon',
        description: 'Atlantic salmon fillet with lemon butter sauce, asparagus, and roasted potatoes',
        price: 32.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
        rating: 4.9,
        prepTime: 20
    },
    {
        name: 'Beef Wellington',
        description: 'Tender beef tenderloin wrapped in puff pastry with mushroom duxelles',
        price: 45.99,
        category: 'specials',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
        rating: 5.0,
        prepTime: 35
    },
    {
        name: 'Lobster Bisque',
        description: 'Rich and creamy lobster soup with cognac and fresh herbs',
        price: 16.99,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
        rating: 4.7,
        prepTime: 15
    },
    {
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce, parmesan, croutons, and classic Caesar dressing',
        price: 12.99,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 10
    },
    {
        name: 'Margherita Pizza',
        description: 'Wood-fired pizza with fresh mozzarella, basil, and San Marzano tomatoes',
        price: 18.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 15
    },
    {
        name: 'Filet Mignon',
        description: 'Prime beef tenderloin with red wine reduction and garlic mashed potatoes',
        price: 42.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
        rating: 4.9,
        prepTime: 30
    },
    {
        name: 'Chicken Tikka Masala',
        description: 'Tender chicken in creamy tomato curry sauce with basmati rice',
        price: 24.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
        isSpicy: true,
        rating: 4.7,
        prepTime: 25
    },
    {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone',
        price: 9.99,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 5
    },
    {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
        price: 11.99,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
        isVegetarian: true,
        rating: 4.9,
        prepTime: 12
    },
    {
        name: 'Crème Brûlée',
        description: 'Classic French custard with caramelized sugar crust',
        price: 10.99,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 8
    },
    {
        name: 'Espresso',
        description: 'Rich Italian espresso shot',
        price: 3.99,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 3
    },
    {
        name: 'Fresh Lemonade',
        description: 'Homemade lemonade with fresh mint',
        price: 4.99,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=800',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 5
    },
    {
        name: 'House Wine',
        description: 'Selection of red or white wine from our cellar',
        price: 12.99,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 2
    },
    {
        name: 'Sushi Platter',
        description: 'Assorted fresh sushi and sashimi with wasabi and pickled ginger',
        price: 38.99,
        category: 'specials',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
        rating: 4.9,
        prepTime: 20
    },
    {
        name: 'Pasta Carbonara',
        description: 'Traditional Roman pasta with pancetta, egg, and pecorino cheese',
        price: 22.99,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
        rating: 4.6,
        prepTime: 18
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await MenuItem.deleteMany({});
        console.log('Cleared existing menu items');

        await MenuItem.insertMany(menuItems);
        console.log('Database seeded successfully with menu items');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
