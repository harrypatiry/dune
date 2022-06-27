const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const postsRoutes = require('./routes/postsRoutes');
require('./connection')

const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use('/users', userRoutes)
app.use('/posts', postsRoutes);

app.listen(5000, () => {
    console.log('listening on port 5000')
})

