const mongo = require("mongoose")

const Url = new mongo.Schema({
    ShortId: {
        type: String,
        required:true,
        unique:true,
    },
    OriginalUrl: {
        type:String,
        required:true,
    },
    visit:[{
        timestamp: {type:Number}
    }],
},{timestamps:true});

const urlModel = mongo.model("urls", Url);

module.exports = urlModel;