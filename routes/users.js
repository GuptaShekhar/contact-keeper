const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const { check, validationResult } = require('express-validator')
const User = require('../models/User')

// @route POST /api/users
// @desc Register a user
// @access public
router.post('/', [
    check('name', 'Please add a name')
        .not()
        .isEmpty(),
    check('email', 'Please provide a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'User already exists' })
        }
        user = new User({ name, email, password })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err
            res.send({ token })
        })
        // res.send('User saved successfully')
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'server error' })
    }
})

module.exports = router