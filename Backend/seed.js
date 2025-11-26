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
    // --- APPETIZERS ---
    {
        name: 'Vegetable Samosa',
        description: 'Crispy pastry filled with spiced potatoes, peas, and aromatic herbs',
        price: 40,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 8,
        quantity: 100,
        servingSize: '2 Pieces'
    },
    {
        name: 'Chicken Samosa',
        description: 'Golden fried pastry stuffed with minced chicken and Indian spices',
        price: 60,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80',
        rating: 4.8,
        prepTime: 10,
        quantity: 80,
        servingSize: '2 Pieces'
    },
    {
        name: 'Paneer Tikka',
        description: 'Marinated cottage cheese cubes grilled in tandoor with bell peppers and onions',
        price: 280,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&q=80',
        isVegetarian: true,
        rating: 4.9,
        prepTime: 15,
        quantity: 60,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 280 },
            { name: 'Full Plate', price: 480 }
        ]
    },
    {
        name: 'Chicken Tikka',
        description: 'Tender chicken pieces marinated in yogurt and spices, grilled to perfection',
        price: 320,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1200&q=80',
        rating: 4.9,
        prepTime: 15,
        quantity: 70,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 320 },
            { name: 'Full Plate', price: 550 }
        ]
    },
    {
        name: 'Onion Bhaji',
        description: 'Crispy onion fritters with chickpea flour and Indian spices',
        price: 120,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1200&q=80',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 10,
        quantity: 90,
        servingSize: '4 Pieces'
    },
    {
        name: 'Vegetable Pakora',
        description: 'Mixed vegetable fritters with mint chutney',
        price: 140,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 12,
        quantity: 85,
        servingSize: '6 Pieces'
    },
    {
        name: 'Tandoori Chicken Wings',
        description: 'Spicy chicken wings marinated in tandoori masala and grilled',
        price: 350,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=1200&q=80',
        isSpicy: true,
        rating: 4.8,
        prepTime: 18,
        quantity: 65,
        servingSize: '6 Pieces'
    },
    {
        name: 'Papdi Chaat',
        description: 'Crispy wafers topped with yogurt, tamarind chutney, and spices',
        price: 100,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=1200&q=80',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 8,
        quantity: 75,
        servingSize: '1 Plate'
    },

    // --- BREADS ---
    {
        name: 'Butter Naan',
        description: 'Soft leavened bread brushed with butter, baked in tandoor',
        price: 40,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=1200&q=80',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 8,
        quantity: 120,
        servingSize: '1 Piece'
    },
    {
        name: 'Garlic Naan',
        description: 'Naan topped with fresh garlic and cilantro',
        price: 50,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1617343267882-ce72a03e3c04?w=1200&q=80',
        isVegetarian: true,
        rating: 4.9,
        prepTime: 10,
        quantity: 110,
        servingSize: '1 Piece'
    },
    {
        name: 'Cheese Naan',
        description: 'Naan stuffed with melted cheese',
        price: 80,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 12,
        quantity: 90,
        servingSize: '1 Piece'
    },
    {
        name: 'Tandoori Roti',
        description: 'Whole wheat flatbread baked in tandoor',
        price: 30,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1619888312807-3f0c6c7c6d8f?w=1200&q=80',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 7,
        quantity: 130,
        servingSize: '1 Piece'
    },
    {
        name: 'Aloo Paratha',
        description: 'Whole wheat bread stuffed with spiced potato filling',
        price: 60,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 15,
        quantity: 70,
        servingSize: '1 Piece'
    },

    // --- MAIN COURSE (VEGETARIAN) ---
    {
        name: 'Paneer Butter Masala',
        description: 'Cottage cheese cubes in rich creamy tomato gravy with butter and cream',
        price: 280,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
        isVegetarian: true,
        rating: 4.9,
        prepTime: 20,
        quantity: 55,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 280 },
            { name: 'Full Plate', price: 480 }
        ]
    },
    {
        name: 'Palak Paneer',
        description: 'Cottage cheese in creamy spinach gravy with aromatic spices',
        price: 260,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=1200&q=80',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 22,
        quantity: 50,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 260 },
            { name: 'Full Plate', price: 450 }
        ]
    },
    {
        name: 'Dal Makhani',
        description: 'Black lentils slow-cooked with butter, cream, and aromatic spices',
        price: 220,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 25,
        quantity: 70,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 220 },
            { name: 'Full Plate', price: 380 }
        ]
    },
    {
        name: 'Chana Masala',
        description: 'Chickpeas cooked in tangy tomato-onion gravy with Indian spices',
        price: 180,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 18,
        quantity: 65,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 180 },
            { name: 'Full Plate', price: 320 }
        ]
    },
    {
        name: 'Malai Kofta',
        description: 'Vegetable and paneer dumplings in creamy cashew gravy',
        price: 300,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&q=80',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 25,
        quantity: 45,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 300 },
            { name: 'Full Plate', price: 520 }
        ]
    },
    {
        name: 'Baingan Bharta',
        description: 'Roasted eggplant mash cooked with tomatoes, onions, and spices',
        price: 200,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=1200&q=80',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 20,
        quantity: 50,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 200 },
            { name: 'Full Plate', price: 350 }
        ]
    },
    {
        name: 'Jeera Rice',
        description: 'Basmati rice tempered with cumin seeds and ghee',
        price: 120,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=80',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 15,
        quantity: 80,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 120 },
            { name: 'Full Plate', price: 200 }
        ]
    },

    // --- MAIN COURSE (NON-VEGETARIAN) ---
    {
        name: 'Butter Chicken',
        description: 'Tender chicken in rich tomato-butter gravy with cream and aromatic spices',
        price: 320,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1200&q=80',
        rating: 5.0,
        prepTime: 25,
        quantity: 60,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 320 },
            { name: 'Full Plate', price: 550 }
        ]
    },
    {
        name: 'Chicken Tikka Masala',
        description: 'Grilled chicken tikka in creamy tomato curry sauce',
        price: 300,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1200&q=80',
        rating: 4.9,
        prepTime: 22,
        quantity: 65,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 300 },
            { name: 'Full Plate', price: 520 }
        ]
    },
    {
        name: 'Lamb Rogan Josh',
        description: 'Tender lamb cooked in aromatic Kashmiri curry with yogurt and spices',
        price: 400,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80',
        rating: 4.8,
        prepTime: 35,
        quantity: 40,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 400 },
            { name: 'Full Plate', price: 700 }
        ]
    },
    {
        name: 'Chicken Vindaloo',
        description: 'Spicy Goan curry with chicken, vinegar, and fiery red chilies',
        price: 300,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=1200&q=80',
        isSpicy: true,
        rating: 4.7,
        prepTime: 28,
        quantity: 50,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 300 },
            { name: 'Full Plate', price: 520 }
        ]
    },
    {
        name: 'Lamb Korma',
        description: 'Mild lamb curry in creamy cashew and almond gravy',
        price: 380,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=1200&q=80',
        rating: 4.8,
        prepTime: 30,
        quantity: 45,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 380 },
            { name: 'Full Plate', price: 650 }
        ]
    },
    {
        name: 'Fish Curry',
        description: 'Fresh fish cooked in coconut-based curry with curry leaves',
        price: 350,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1580959375944-0b7b2b2d9f3f?w=1200&q=80',
        rating: 4.7,
        prepTime: 25,
        quantity: 35,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 350 },
            { name: 'Full Plate', price: 600 }
        ]
    },
    {
        name: 'Prawn Masala',
        description: 'Jumbo prawns in spicy tomato-onion gravy',
        price: 450,
        category: 'main-course',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=1200&q=80',
        rating: 4.8,
        prepTime: 22,
        quantity: 30,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 450 },
            { name: 'Full Plate', price: 800 }
        ]
    },

    // --- BIRYANI (SPECIALS) ---
    {
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice layered with spiced chicken and aromatic herbs',
        price: 280,
        category: 'specials',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&q=80',
        rating: 4.9,
        prepTime: 30,
        quantity: 55,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 280 },
            { name: 'Full Plate', price: 480 }
        ]
    },
    {
        name: 'Lamb Biryani',
        description: 'Aromatic basmati rice with tender lamb pieces and saffron',
        price: 380,
        category: 'specials',
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=1200&q=80',
        rating: 4.9,
        prepTime: 35,
        quantity: 40,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 380 },
            { name: 'Full Plate', price: 650 }
        ]
    },
    {
        name: 'Vegetable Biryani',
        description: 'Fragrant rice with mixed vegetables, nuts, and aromatic spices',
        price: 220,
        category: 'specials',
        image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=1200&q=80',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 25,
        quantity: 60,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 220 },
            { name: 'Full Plate', price: 380 }
        ]
    },
    {
        name: 'Hyderabadi Dum Biryani',
        description: 'Royal biryani slow-cooked with chicken, saffron, and fried onions',
        price: 350,
        category: 'specials',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&q=80',
        rating: 5.0,
        prepTime: 40,
        quantity: 35,
        servingSize: 'Half Plate',
        sizes: [
            { name: 'Half Plate', price: 350 },
            { name: 'Full Plate', price: 600 }
        ]
    },

    // --- DESSERTS ---
    {
        name: 'Gulab Jamun',
        description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
        price: 80,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1571167530149-c9b4c1f5b4d5?w=1200&q=80',
        isVegetarian: true,
        rating: 4.9,
        prepTime: 5,
        quantity: 80,
        servingSize: '2 Pieces'
    },
    {
        name: 'Rasmalai',
        description: 'Soft cottage cheese patties in sweetened, thickened milk with cardamom',
        price: 100,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 6,
        quantity: 60,
        servingSize: '2 Pieces'
    },
    {
        name: 'Kulfi',
        description: 'Traditional Indian ice cream with cardamom, saffron, and pistachios',
        price: 70,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=1200&q=80',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 3,
        quantity: 70,
        servingSize: '1 Piece'
    },
    {
        name: 'Kheer',
        description: 'Creamy rice pudding with cardamom, saffron, and nuts',
        price: 90,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&q=80',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 5,
        quantity: 65,
        servingSize: '1 Bowl'
    },
    {
        name: 'Gajar Halwa',
        description: 'Carrot pudding with milk, ghee, and nuts',
        price: 110,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 8,
        quantity: 50,
        servingSize: '1 Bowl'
    },
    {
        name: 'Jalebi',
        description: 'Crispy sweet spirals soaked in saffron syrup',
        price: 80,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 10,
        quantity: 75,
        servingSize: '100 grams'
    },

    // --- BEVERAGES ---
    {
        name: 'Mango Lassi',
        description: 'Sweet yogurt drink blended with fresh mango pulp',
        price: 80,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=1200&q=80',
        isVegetarian: true,
        rating: 4.9,
        prepTime: 5,
        quantity: 90,
        servingSize: '300ml'
    },
    {
        name: 'Sweet Lassi',
        description: 'Traditional yogurt drink sweetened with sugar and cardamom',
        price: 60,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1571328003758-4a3921661729?w=1200&q=80',
        isVegetarian: true,
        rating: 4.7,
        prepTime: 5,
        quantity: 95,
        servingSize: '300ml'
    },
    {
        name: 'Salted Lassi',
        description: 'Savory yogurt drink with cumin and salt',
        price: 60,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=80',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 5,
        quantity: 85,
        servingSize: '300ml'
    },
    {
        name: 'Masala Chai',
        description: 'Spiced Indian tea with cardamom, ginger, and milk',
        price: 30,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1200&q=80',
        isVegetarian: true,
        rating: 4.8,
        prepTime: 7,
        quantity: 120,
        servingSize: '150ml (1 Cup)'
    },
    {
        name: 'Nimbu Pani',
        description: 'Fresh lemonade with mint and black salt',
        price: 40,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1200&q=80',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 5,
        quantity: 100,
        servingSize: '300ml'
    },
    {
        name: 'Kingfisher Beer',
        description: 'Premium Indian lager beer',
        price: 180,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1200&q=80',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 2,
        quantity: 110,
        servingSize: '650ml (1 Bottle)'
    },
    {
        name: 'Rose Milk',
        description: 'Chilled milk flavored with rose syrup',
        price: 50,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=1200&q=80',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 4,
        quantity: 80,
        servingSize: '250ml'
    },
    {
        name: 'Jaljeera',
        description: 'Refreshing cumin-flavored drink with mint and tamarind',
        price: 50,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1605209680377-5f75569947e4?w=1200&q=80',
        isVegetarian: true,
        rating: 4.6,
        prepTime: 5,
        quantity: 75,
        servingSize: '300ml'
    },
    {
        name: 'Mineral Water',
        description: 'Packaged drinking water',
        price: 20,
        category: 'beverages',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1200&q=80',
        isVegetarian: true,
        rating: 4.5,
        prepTime: 1,
        quantity: 150,
        servingSize: '1 Liter (1 Bottle)'
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
