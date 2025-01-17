const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

const { check, validationResult } = require('express-validator')
const User = require('../models/User')

// @route GET /api/auth
// @desc Get logged in user
// @access private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'server error' })
    }
})

// @route POST /api/auth
// @desc Auth user and get token
// @access public
router.post('/', [
    check('email', 'Please provide a valid email')
        .isEmail(),
    check('password', 'Please provide a valid password')
        .exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }
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
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'server error' })
    }
})

module.exports = router