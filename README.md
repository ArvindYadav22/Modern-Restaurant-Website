# Gourmet Haven - Restaurant Website

A full-stack restaurant website built with the MERN stack (MongoDB, Express, React, Node.js) featuring a premium UI, online ordering, table reservations, and user authentication.

## Features

- **Modern UI/UX**: Premium design with glassmorphism effects, smooth animations, and responsive layouts
- **Menu Browsing**: Browse menu items with category filtering and search functionality
- **Shopping Cart**: Add items to cart with quantity management
- **Online Ordering**: Place orders with delivery address and payment options
- **Table Reservations**: Reserve tables with date, time, and guest count
- **User Authentication**: Secure registration and login with JWT tokens
- **User Profile**: View order history and reservation history
- **Admin Features**: Menu management (create, update, delete items)

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS enabled

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Context API for state management
- Custom CSS with modern design system

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd restaurant-website
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

### 3. Frontend Setup
```bash
cd ../client
npm install
```

## Running the Application

### Start MongoDB
If using local MongoDB:
```bash
mongod
```

### Start Backend Server
```bash
cd server
npm start
```
The server will run on http://localhost:5000

### Start Frontend Development Server
```bash
cd client
npm start
```
The application will open at http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single menu item
- `POST /api/menu` - Create menu item (admin only)
- `PUT /api/menu/:id` - Update menu item (admin only)
- `DELETE /api/menu/:id` - Delete menu item (admin only)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/myorders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/status` - Update order status (protected)

### Reservations
- `POST /api/reservations` - Create reservation (protected)
- `GET /api/reservations/myreservations` - Get user's reservations (protected)
- `GET /api/reservations/:id` - Get single reservation (protected)
- `PUT /api/reservations/:id` - Update reservation (protected)
- `DELETE /api/reservations/:id` - Cancel reservation (protected)

## Project Structure

```
restaurant-website/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   └── Reservation.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── orders.js
│   │   └── reservations.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Hero.js
    │   │   ├── MenuCard.js
    │   │   └── Footer.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Menu.js
    │   │   ├── Cart.js
    │   │   ├── Reservations.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Profile.js
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── CartContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Default Admin Account

To create an admin account, register normally and then manually update the user's role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Design Features

- **Color Scheme**: Elegant gold and dark theme
- **Typography**: Playfair Display for headings, Inter for body text
- **Effects**: Glassmorphism, gradients, smooth transitions
- **Responsive**: Mobile-first design with breakpoints
- **Animations**: Fade-in, slide-in, and hover effects

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC
