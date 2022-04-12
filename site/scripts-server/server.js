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

//from https://www.opensourceforu.com/2020/03/session-handling-in-node-js-a-tutorial/
const router = express.Router();
var sess; //change later - can only handle one session at a time

//from https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
var session = require("express-session");
const miliseconds = 1000 * 60 * 5; //five minutes

app.use(session({
    secret: "SHHH! NOT SO LOUD!",
    saveUninitialized: true,
    cookie: { maxAge: miliseconds },
    resave: false
}));

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

//redirects homepage
router.get("/", function (request, response) {
    sess = request.session;
    if (sess.username) {
        return response.redirect("/admin");
    }
    else {
        response.sendFile("../site/login.html");
    }
});

//log in
router.post("/login", function (request, response) {
    sess = request.session;
    sess.username = request.body.username;
    response.end("done");
});

//go to page that can only be accessed if user is logged in
router.get("/admin", function (request, response) {
    sess = request.session;
    if (sess.cookie) {
        response.write(`<h3>Logged in as: ${sess.username}</h3>`);
        response.end(`<a href="/logout">Log Out</a>`);
    }
    else {
        response.write(`<h1>You are not logged in.</h1>`);
        response.end(`<a href="/login">Log In</a>`);
    }
});

//destroy session
router.get("/logout", function (request, response) {
    request.session.destroy(function (err) {
        if (err) {
            console.log(err);
            //throw(err);
        }
        else {
            response.redirect("/");
        }
    });
});

app.use("/", router);

module.exports = app;