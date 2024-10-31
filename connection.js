const mongo = require("mongoose")

async function connectionDB(url){
    return mongo.connect(url)
};
module.exports = { connectionDB};
