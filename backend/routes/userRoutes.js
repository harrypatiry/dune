const router = require('express').Router();
const User = require('../models/User')
const authUser = require('../middleware/auth')

//user creation
router.post('/', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.create({email, password});
        const token = await user.generateAuthToken();
        res.status(201).json({user, token});
    } catch (err) {
        let msg;
        if (err.code === 11000) {
            msg = "email already exists"
        } else {
            msg = err.message
        }
        res.status(400).json(msg)
    }
})

//login user
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken()
        res.json({user, token})
    } catch (err) {
        res.status(400).json(err.message)
    }
})

//logout user
router.delete('/logout', authUser, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {
            return tokenObj.token !== req.token
        })
        await req.user.save()
        res.status(200).send()
    } catch (err) {
        res.status(400).json(err.message)
    }
})

module.exports = router;