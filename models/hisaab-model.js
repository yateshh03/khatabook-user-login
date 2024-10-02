const mongoose = require('mongoose');

const hisaabSchema = mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 100, 
    },
    description:{
        type: String,
        trim: true,
        required: true,
        
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    encrypted:{
        type: Boolean,
        required: true,
    },
    shareable:{
        type: Boolean,
        required: true,
    },
    passcode:{
        type: String,
        default: ""
    },
    editpermissions:{
        type: Boolean,
        default: false
    }
}, {timestamps: true }
);

module.exports = mongoose.model("hisaab", hisaabSchema)