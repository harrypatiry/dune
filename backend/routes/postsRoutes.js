const router = require('express').Router()
const Blog = require('../models/BlogPost')
const authUser = require('../middleware/auth')
const BlogPost = require('../models/BlogPost')

router.post('/', authUser, async(req, res) => {
    const {title, content, category} = req.body
    try{
        const article = await BlogPost.create({title, content, creator: req.user._id, category})
        req.user.articles.push(article._id)
        await req.user.save()
        res.json(article)
    } catch(err) {
        res.status(400).json(err.message)
    }
})


router.get('/', async(req, res) => {
    try {
        const posts = await BlogPost.find()
        res.json(posts)
    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.get('/me', authUser, async (req, res) => {
    try {
        const user = req.user;
        user.populate('articles').then(({articles}) => (
            res.json(articles))
        )
    } catch (err) {
        res.status(404).json(err)
    }
})

router.get('/:id', async(req, res) => {
    const {id} = req.params
    try{
        const article = await BlogPost.findById(id)
        article.populate('creator').then(result => res.json(result))
    } catch(err) {
        res.status(400).json("not found")
    }
})

router.delete('/:id', authUser, async (req, res) => {
    const { id } = req.params
    try {
        const article = await BlogPost.findById(id)
        if(article.creator.toString() === req.user._id.toString()) {
            await article.remove()
            res.status(200).send()
        } else {
            res.status(401).json("You do not have permission")
        }
    } catch(err) {
        res.status(400).send(err.message)
    }
})

router.patch('/:id', authUser, async (req, res) => {
    const {id} = req.params
    const {title, content, category} = req.body
    try {
        const article = await Blog.findByIdAndUpdate(id, {title, content, category})
        res.status(200).send()
    } catch (err) {
        res.status(400).send()
    }
})

module.exports = router;