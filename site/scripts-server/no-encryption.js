//run server locally without https or encryption (for testing)

"use strict";

var app = require("./server.js");
var http = require("http");

var httpServer = http.createServer(app);
if (httpServer.listen(8081)) {
    console.log("Local app listening on 127.0.0.1:" + httpServer.address().port);
}