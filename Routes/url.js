const express = require("express")
const routes = express.Router();
const {handleCreateShortUrl} = require("../controller/url")

routes.post("/",handleCreateShortUrl)


module.exports = routes;