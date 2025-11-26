import React, { useState, useEffect } from 'react';
import MenuCard from '../components/MenuCard';
import { menuAPI } from '../services/api';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const categories = [
        { value: 'all', label: 'All Items' },
        { value: 'appetizers', label: 'Appetizers' },
        { value: 'main-course', label: 'Main Course' },
        { value: 'desserts', label: 'Desserts' },
        { value: 'beverages', label: 'Beverages' },
        { value: 'specials', label: 'Chef Specials' }
    ];

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const { data } = await menuAPI.getAllItems();
                setMenuItems(data);
                setFilteredItems(data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    useEffect(() => {
        let filtered = menuItems;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredItems(filtered);
    }, [selectedCategory, searchQuery, menuItems]);

    return (
        <div className="menu-page">
            <div className="menu-header">
                <div className="container">
                    <h1>Our Menu</h1>
                    <p>Explore our exquisite collection of culinary masterpieces</p>
                </div>
            </div>

            <div className="menu-content section">
                <div className="container">
                    <div className="menu-filters">
                        <div className="search-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search dishes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="category-filters">
                            {categories.map(category => (
                                <button
                                    key={category.value}
                                    className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.value)}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    ) : filteredItems.length > 0 ? (
                        <div className="grid grid-3">
                            {filteredItems.map(item => (
                                <MenuCard key={item._id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <h3>No dishes found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
