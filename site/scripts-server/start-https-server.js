//from https://www.npmjs.com/package/greenlock-express

"use strict";
 
var app = require("./server.js");
 
require("greenlock-express")
    .init({
        packageRoot: __dirname,
        configDir: "./greenlock.d",
 
        // contact for security and critical bug notices
        maintainerEmail: "jon@example.com",
 
        // whether or not to run at cloudscale
        cluster: false
    })
    // Serves on 80 and 443
    // Gets SSL certificates magically!
    .serve(app);