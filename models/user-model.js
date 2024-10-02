const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 3,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture:{
        type: String,
        trim: true,


    },
    password: {
        type: String,
        required: true,
        select: false
    },
    
    hisaab: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hisaab' }]
})

module.exports = mongoose.model("users", userSchema)