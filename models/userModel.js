const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    displayName:{
        type: String,
        required: [true, 'Please tell us your name']
    },
    googleId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User' ,userSchema);