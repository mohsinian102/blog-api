const express = require('express');
const authController = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(400).json({ message: info.message || 'Invalid credentials.' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            return res.status(200).json({ message: 'Successfully logged in', user });
        });
    })(req, res, next);
});
router.post('/logout', authController.logout);

module.exports = router;

