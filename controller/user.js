const user = require("../models/user")
const URL = require("../models/url")
const {v4: uuidv4} = require("uuid")
const {setUser} = require("../sevice/auth")
async function handleUsersign(req,res){
    const {Name, Email, Password} = req.body;
    const urls = await URL.find({})
    await user.create({
        Name:Name,
        Email:Email,
        Password:Password

     })
     .then(()=> {
        // console.log("its is running the then")
       
        res.render("login")
     })
     .catch(err => {console.log("error 501")
        res.render("sign", { error: "This email is already registered in our Database"})
     })
    

    
}

async function handleLogin(req,res){
    const {Email, Password} = req.body;
    const User = await user.findOne(
        {
        Email,
        Password
    });
    // console.log(User)
    if(!User){
        return res.render("login", {error: "Invalid username or password"})
    }
    const sessionid = uuidv4();
    res.cookie("uid", sessionid)
    const urls = await URL.find({})
    return res.render('home',  {
        url: urls,    })
    // return res.render("home")

}

module.exports = {handleUsersign,
    handleLogin
};