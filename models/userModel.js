const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        uname : {
            type : String,
            required : true,
            unique : true
        },
        upwd : {
            type : String,
            required : true,
            unique : false
        }
    },
    {
        collection : 'userDataCollection'
    }
);

module.exports = mongoose.model('userDataCollection', userSchema)