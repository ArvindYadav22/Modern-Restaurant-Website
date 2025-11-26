const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const menuItems = await MenuItem.find(query);
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', protect, admin, async (req, res) => {
    try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', protect, admin, async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (menuItem) {
            res.json({ message: 'Menu item removed' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
