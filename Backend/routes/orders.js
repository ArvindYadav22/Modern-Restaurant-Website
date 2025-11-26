const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
    try {
        const { items, deliveryAddress, paymentMethod, specialInstructions } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            deliveryAddress,
            paymentMethod,
            specialInstructions
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.menuItem')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.menuItem');

        if (order) {
            if (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
                res.json(order);
            } else {
                res.status(403).json({ message: 'Not authorized to view this order' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id/status', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
