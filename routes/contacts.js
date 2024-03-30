const express = require('express')
const router = express.Router()

// @route GET /api/contacts
// @desc Get all users contacts
// @access private
router.get('/', (req, res) => {
    res.send('get all contacts')
})

// @route POST /api/contacts
// @desc Add new contact
// @access private
router.post('/', (req, res) => {
    res.send('Add contact')
})

// @route PUT /api/contacts/:id
// @desc Update contact
// @access private
router.put('/', (req, res) => {
    res.send('Update contact')
})

// @route DELETE /api/contacts/:id
// @desc Delete contact
// @access private
router.delete('/', (req, res) => {
    res.send('delete contact')
})

module.exports = router