import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Reservations from './pages/Reservations';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = React.useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <div className="App">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/reservations" element={<Reservations />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                        <Footer />
                    </div>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
