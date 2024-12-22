const mongoose = require('mongoose');
const database = async()=>{
    await mongoose.connect('mongodb://localhost:27017/test')
    .then(async() => {
        console.log("connected to database")
    })
    .catch((err) => {console.log(err)})
}

module.exports = database;