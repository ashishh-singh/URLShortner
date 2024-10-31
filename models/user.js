const mongoose = require("mongoose")

const user = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email:{
        type:String,
        required: true,
        unique:true

    },
    Password:{
        type:String,
        required:true,
    },
});
const CreateUser = mongoose.model("user", user)

module.exports = CreateUser;
