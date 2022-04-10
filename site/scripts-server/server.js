"use strict";

//from https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
var express = require('express');
var app = express();
// var fs = require("fs");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use(express.static("../site"));

//separate files added here
var accounts = require("./routes/accounts");
accounts(app);

var modifyDB = require("./routes/modify-db");
modifyDB(app);

var searchDB = require("./routes/search-db");
searchDB(app);

var listDB = require("./routes/list-db");
listDB(app);

//access local website by going to http://localhost:8081
app.get("/", function (request, response) {
    response.setHeader("Cache-Control", "no-cache"); //remove "no-cache" when website is live

    //DON'T CHANGE THIS HERE - REDIRECT TO A DIFFERENT PAGE IN INDEX.HTML
    response.sendFile("../site/index.html"); //start user on index page
    //response.redirect("../site/login.html");
});

module.exports = app;