const {getUser} = require("../sevice/auth")
async function restrictToLoggedinUser(req,res,next){
    const userUid = req.cookies.uid;
    if(!userUid) return res.redirect("/login")
}