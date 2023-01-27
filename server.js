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
app.get("/", (req, res) => {
    res.send("Arshiya challana - 154101216");
});
app.listen(HTTP_PORT);