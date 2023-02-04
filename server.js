/********************************************************************************* 
*  WEB322 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.   
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including web sites) or distributed to other students. 
*  
*  Name: Arshiya challana  Student ID: 154101216 Date: 
********************************************************************************/
var HTTP_PORT = 8080;
var express = require("express");
var app = express();
const path = require('path');
const router = express.Router();
app.use(express.static('public'))
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/about.html'));
});
app.use('/', router);
app.listen(HTTP_PORT);