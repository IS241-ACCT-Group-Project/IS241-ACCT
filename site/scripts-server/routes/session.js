//from https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
var app = require("./../server");
var sessions = require("express-session");
const miliseconds = 1000 * 60 * 5; //five minutes

app.use(sessions({
    secret: "SHHH! NOT SO LOUD!",
    saveUninitialized: true,
    cookie: { maxAge: miliseconds },
    resave: false
}));