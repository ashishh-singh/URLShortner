const mongo = require("mongoose")

async function connectionDB(url){
    return mongo.connect(url)
};
module.exports = { connectionDB};
// mongodb+srv://Ashish:<db_password>@url1.nb2sm.mongodb.net/
