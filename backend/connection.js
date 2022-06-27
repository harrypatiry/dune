const mongoose = require('mongoose');
require('dotenv').config()

//has to have sample data before starting the server
//localhost
mongoose.connect('mongodb://localhost:27017/dune?retryWrites=true&w=majority', () => {
    console.log('connected to local database')
})

//remote cluster
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.vxfoxvb.mongodb.net/dunedata?retryWrites=true&w=majority`, () => {
//     console.log('connected to cluster0')
// })