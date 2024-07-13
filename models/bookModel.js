const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        isbn : {
            type: String,
            required : true,
            unique : true
        },
        title : {
            type : String,
            required : true,
            unique : true
        },
        author : {
            type : String,
            required : true,
            unique : false
        },
        genre : {
            type : String,
            required : true,
            unique : false
        },
        year : {
            type : String,
            required : true,
            unique : false
        }
    },
    {
        collection : 'bookDataCollection'
    }
);

module.exports = mongoose.model('bookDataCollection', bookSchema)