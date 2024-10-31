const express = require("express");
const app = express();
const {connectionDB} = require("./connection")
const port = process.env.PORT || 6005;
const path = require("path")
const URL = require("./models/url")
const Urlroute = require("./Routes/url")
const login = require("./Routes/staticlogin")
const user = require("./models/user")
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
app.use(express.static(path.join(__dirname,"public")))


app.use("/", login)
app.use("/url", Urlroute)

app.get("/find/user",async (req,res) => {
    const allUser = await user.find({})
    return res.json(allUser)
})

// app.get("/check/url/data", async (req,res) => {
//     const data = await URL.find({});

//     return res.json(data)
// })

connectionDB("mongodb+srv://Ashish:Myurlproject@url1.nb2sm.mongodb.net/urls?retryWrites=true&w=majority&appName=URL1", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// connectionDB("mongodb://localhost:27017/urls").then(() => console.log("connect to Db successfuly")).catch(err => console.log(` not connected error ${err}`));

app.get("/url/:shortId", async(req,res) => {
    const newShortid = req.params.shortId;
    // console.log(req.body)
    const entry = await URL.findOneAndUpdate({
        ShortId : newShortid
    },
     {
        $push:{
        visit: {timestamp: Date.now()}
    }})
    
    // console.log(entry)
    res.redirect(entry.OriginalUrl)
})

app.get("/delete", async (req,res) => {
    const duplicates = await user.aggregate([
        { $group: { _id: "$Email", count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } }
    ]);
    
    console.log('Duplicate Emails:', duplicates);
    for (const duplicate of duplicates) {
    const email = duplicate._id;
    const users = await user.find({ Email: email });

    
    for (let i = 1; i < users.length; i++) {
        await user.deleteOne({ _id: users[i]._id });
    }
    console.log("deletedd all duplicates")
    
}
res.json({status:`sucessfully deleted ${duplicates}`})

})

// app.get("/find", (req,res) => {
    
//     return res.send("hellow");
// })

app.listen(port, ()=> console.log(`server started at port ${port}`))