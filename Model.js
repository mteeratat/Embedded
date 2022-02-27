const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    data: Number,
},{
    collection: 'embedded',
    versionKey: false,
})

const model = mongoose.model('Embedded', schema)

module.exports = model