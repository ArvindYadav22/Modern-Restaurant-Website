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
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
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
        image: 'https://media.istockphoto.com/id/1430060145/photo/sweet-tasty-fried-indian-dish-samosha-indian-delicious-deep-fried-breakfast-samosa-also-know.webp?a=1&b=1&s=612x612&w=0&k=20&c=h7WbMLHtbN1e6tBOMIEHmkQ6Ps9kjZdyIkVWRBwde3o=',
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
        image: 'https://media.istockphoto.com/id/1474136049/photo/close-up-image-of-paneer-kebabs-marinated-curd-cheese-pieces-on-metal-skewers-red-onion-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=cvfV2qr33X-FNf0E4GCYnVovx3w7DdXmyIxv4EuMLII=',
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
        image: 'https://media.istockphoto.com/id/1320005396/photo/chicken-tikka-kebab.webp?a=1&b=1&s=612x612&w=0&k=20&c=6RORRBU02Dc_PCwN2giuGtxwExkTzhPAZNtvRo9qmI0=',
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
        image: 'https://images.unsplash.com/photo-1716535232842-d10da4eb33d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fG9uaW9uJTIwYmhhamklMjBjdXJyeXxlbnwwfHwwfHx8MA%3D%3D',
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
        image: 'https://media.istockphoto.com/id/1407355717/photo/crispy-onion-bhajis.webp?a=1&b=1&s=612x612&w=0&k=20&c=tCqvVAFTJQKpjsU-MQwj0NP88wyxVjE-btAfcazyMSg=',
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
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
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
        image: 'https://media.istockphoto.com/id/1158187601/photo/bhelpuri-chaat-chat-is-indian-street-food.jpg?s=612x612&w=0&k=20&c=bDY2H5obmUaknZ-uoT2Zjxk466BmhOpgmQOnT_SYrS4=',
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
        image: 'https://media.istockphoto.com/id/1449429511/photo/green-lacha-chilli-paratha.jpg?s=612x612&w=0&k=20&c=uxo7Xv4mY9ieG6gEU-FDr1V6qzGnbtzgIXmygTLD2yU=',
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
        image: 'https://media.istockphoto.com/id/1140752821/photo/indian-naan-bread-with-garlic-butter-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=lOeYboRNvwONnykKUu7lN-UQg5c0cl0CKfDFiVFfhBk=',
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
        image: 'https://media.istockphoto.com/id/1335722221/photo/garlic-naan-bread-grilled-cheese.webp?a=1&b=1&s=612x612&w=0&k=20&c=wlW4GR93jbCDiwXITgajyYxnL8NI5eHUznqO83bxpds=',
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
        image: 'https://media.istockphoto.com/id/898273142/photo/assorted-indian-bread-basket-includes-chapati-tandoori-roti-or-naan-paratha-kulcha-fulka-missi.webp?a=1&b=1&s=612x612&w=0&k=20&c=XekcdT3j5YiRs4RfYRPnOEjPYurZKqWpyblPKJSJaLM=',
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
        image: 'https://media.istockphoto.com/id/1418692758/photo/north-indian-famous-food-aloo-paratha-with-mango-pickle-and-butter.webp?a=1&b=1&s=612x612&w=0&k=20&c=Rq02SWwsR23m-mYUHW8_hjS89sl4PdJmzrSNqjKFsKg=',
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
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=800&q=80',
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
        image: 'https://media.istockphoto.com/id/1393632685/photo/daal-makhni-or-dal-makhani-is-a-north-indian-recipe-using-black-lentils-and-red-kidney-beans.webp?a=1&b=1&s=612x612&w=0&k=20&c=4PTw0oB85wni_uPx3hhDAq_e7ctd42iZVoYva6Y2kjw=',
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
        image: 'https://media.istockphoto.com/id/1295943731/photo/chana-masala-or-chole-in-black-bowl-on-dark-slate-table-top-indian-cuisine-veg-chickpeas.webp?a=1&b=1&s=612x612&w=0&k=20&c=y4piCUqh4PL5-UgQrGhG41fZpFYwmdQfoGCSISag19E=',
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
        image: 'https://media.istockphoto.com/id/1219174110/photo/malai-kofta-curry-in-black-bowl-at-dark-slate-background-malai-kofta-is-indian-cuisine-dish.webp?a=1&b=1&s=612x612&w=0&k=20&c=1b_rwv8br_ng6_ywzsstNebVUqfF2HyUMWhrH-A4kUs=',
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
        image: 'https://media.istockphoto.com/id/693994240/photo/baigan-bharta-in-hindi-or-vangyacha-bharit-in-marathi-or-eggplant-fry-or-curry-favourite.jpg?s=612x612&w=0&k=20&c=6uMx20q4qgxpwLg6bb5BcXlVQpSjiSeEZOoq2cWLfHg=',
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
        image: 'https://media.istockphoto.com/id/1352656280/photo/jeera-rice-or-zeera-rice-is-an-indian-dish-consisting-of-rice-and-cumin-seeds-close-up-in-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=-8p7vTDrD9JlaGlMWskvQU_N495JL8Z93d0JvZ0Z9Oc=',
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
        image: 'https://images.unsplash.com/photo-1728910107534-e04e261768ae?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',
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
        image: 'https://media.istockphoto.com/id/1310092401/photo/steak-cooked-with-vegetables.webp?a=1&b=1&s=612x612&w=0&k=20&c=slVlSoK9HrR1fPeYw6ycbaVVwIz6fPbHEXSqDarz5WA=',
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
        image: 'https://images.unsplash.com/photo-1640542509430-f529fdfce835?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1761314036779-84078bec535c?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VsYWIlMjBqYW11bnxlbnwwfHwwfHx8MA%3D%3D',
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
        image: 'https://media.istockphoto.com/id/515853026/photo/traditional-rasmalai-or-ras-malai-indian-dessert-bengali-sweet.webp?a=1&b=1&s=612x612&w=0&k=20&c=M_bkgtt4nYVBSvX5RrWxjG-y07gOvCyFH4x9aiQOVZo=',
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
        image: 'https://media.istockphoto.com/id/657073780/photo/rajwari-or-rajwadi-sweet-kesar-badam-pista-kulfi-or-ice-cream-candy.webp?a=1&b=1&s=612x612&w=0&k=20&c=D4gZyAdK340jjnX8KGhXaflZISqBkmdd9Od0wTmQi1U=',
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
        image: 'https://media.istockphoto.com/id/1453999382/photo/jhangore-ki-kheer.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZKfcvqfbRZKAAtIaG8dacTEUdzjNJ7crRKgAUBCzyPo=',
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
        image: 'https://media.istockphoto.com/id/1447442563/photo/homemade-carrot-pudding-gajar-halwa-indian-dessert.webp?a=1&b=1&s=612x612&w=0&k=20&c=OnzOYQ8A09rbZm7zU_m2fdzobj0tJg-T9CfYSHhgTOI=',
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
        image: 'https://media.istockphoto.com/id/1430753492/photo/indian-sweet-jalebi.webp?a=1&b=1&s=612x612&w=0&k=20&c=aO_1E0NcBstoEmqR8Bpw_eJpMT16eFUTcTdxHrOeHuM=',
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
        image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80',
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
        image: 'https://media.istockphoto.com/id/1008799838/photo/image-of-a-glass-of-lassi-made-from-milk-curd.webp?a=1&b=1&s=612x612&w=0&k=20&c=wdvfsvCrrVMKEdwK2WYpYftts022m-1PYMUUgFxFOk8=',
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
        image: 'https://media.istockphoto.com/id/925738840/photo/lassie-or-lassi-is-an-authentic-indian-cold-drink-made-up-of-curd-and-milk-and-sugar.jpg?s=612x612&w=0&k=20&c=cco8uS9XjnBKqy7yii7dfJmBSEi7hKK7pOAPgSVg_uY=',
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
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80',
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
        image: 'https://media.istockphoto.com/id/1257155066/photo/ice-rose-latte-in-glass-with-pink-flowers-and-petal-on-white-or-grey-background.jpg?s=612x612&w=0&k=20&c=CzGd6T4Z2RkELvmIMPhxgeOUp_4tusdrubauJh0IDq0=',
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
        image: 'https://media.istockphoto.com/id/2216098330/photo/jal-jeera-is-a-tangy-spicy-indian-beverage-made-with-cumin-mint-lemon-and-black-salt-known.jpg?s=612x612&w=0&k=20&c=3IJ2fCZdRN8eAHcjnww8jB6gU24_j8AH6rRW_ryfsRo=',
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
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80',
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
