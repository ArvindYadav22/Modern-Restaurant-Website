const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
    try {
        const { name, email, phone, date, time, guests, specialRequests } = req.body;

        const reservation = await Reservation.create({
            user: req.user._id,
            name,
            email,
            phone,
            date,
            time,
            guests,
            specialRequests
        });

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/myreservations', protect, async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id })
            .sort({ date: -1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', protect, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('user', 'name email');

        if (reservation) {
            if (reservation.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
                res.json(reservation);
            } else {
                res.status(403).json({ message: 'Not authorized to view this reservation' });
            }
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (reservation) {
            if (reservation.user.toString() === req.user._id.toString() || req.user.role === 'admin') {
                reservation.status = req.body.status || reservation.status;
                reservation.date = req.body.date || reservation.date;
                reservation.time = req.body.time || reservation.time;
                reservation.guests = req.body.guests || reservation.guests;
                reservation.specialRequests = req.body.specialRequests || reservation.specialRequests;

                const updatedReservation = await reservation.save();
                res.json(updatedReservation);
            } else {
                res.status(403).json({ message: 'Not authorized to update this reservation' });
            }
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (reservation) {
            if (reservation.user.toString() === req.user._id.toString() || req.user.role === 'admin') {
                await reservation.deleteOne();
                res.json({ message: 'Reservation cancelled' });
            } else {
                res.status(403).json({ message: 'Not authorized to cancel this reservation' });
            }
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
