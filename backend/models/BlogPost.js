const mongoose = require('mongoose')
const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

const BlogPostSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    title: {
        type: 'string',
        required: true
    },
    category: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    created_at: {
        type: 'string',
        default: new Date().toLocaleDateString('en-US', )
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost;