const URL = require("../models/url")
const shortid= require("shortid")
const {nanoid} = require("nanoid")
const {v4: uuidv4} = require("uuid")
const randomstring = require("randomstring");

async function handleCreateShortUrl(req,res){
    const body = req.body;
    console.log(body.url)
    // console.log(shortId)
    if(!body.url) return res.status(400).json({status:"enter the url, url is required"})
    const newId = randomstring.generate(8);
    await URL.create({
        ShortId: newId,
        OriginalUrl: body.url,
        visit: [],
    });
    const urls = await URL.find({})
    return res.render('home',  {id:newId,
        url: urls,    })
    // return res.json({id: shortId})
   

}

module.exports = {
    handleCreateShortUrl,
}