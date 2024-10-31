const express = require("express")
const route = express.Router();
const {handleUsersign, handleLogin} = require("../controller/user")

route.post("/sign", handleUsersign)
route.post("/home", handleLogin);
route.get("/signup", (req,res) => {
    return res.render("sign")
})
route.get("/", (req,res) => {
    return res.render("login")
})
route.get("/",(req,res) =>{
    res.render("login")
})


module.exports = route;