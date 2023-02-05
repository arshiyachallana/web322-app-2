/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Arshiya challana Student ID: 154101216 Date: 05/02/2023
*
*  Cyclic Web App URL: https://sore-plum-centipede-hat.cyclic.app
*
*  GitHub Repository URL: https://github.com/arshiyachallana/web322-app-2
*
********************************************************************************/ 
var HTTP_PORT = 8080;
var express = require("express");
var app = express();
const path = require('path');
const router = express.Router();
app.use(express.static('public'))
const BlogSerice = require("./blog-service")
const BS = new BlogSerice()
router.get("/", (req, res) => {
    res.redirect("/about");
});
router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/about.html'));
});
router.get("/blog", (req, res) => {
    BS.getPublishedPosts().then((data) => {
        res.json({ data: data });
    }).catch((err) => {
        res.send({ message: err?.message });
    });
});
router.get("/posts", (req, res) => {
    BS.getAllPosts().then((data) => {
        res.json({ data: data });
    }).catch((err) => {
        res.send({ message: err?.message });
    });
});
router.get("/categories", (req, res) => {
    BS.getCategories().then((data) => {
        res.json({ data: data });
    }).catch((err) => {
        res.send({ message: err?.message });
    });
});
BS.initialize().then(() => {
    app.use('/', router);
    app.listen(HTTP_PORT);
    app.all('*', function (req, res) {
        res.sendFile(path.join(__dirname + '/views/404Error.html'));
    });
}).catch((err) => {
    console.log("err", err);
    res.sendFile(path.join(__dirname + '/views/404Error.html'));
})

