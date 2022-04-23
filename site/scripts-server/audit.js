"use strict";

const db = require("./db");

//enum EntryType {
//    Add, Edit, Delete, Login, Logout, OTHER
//}

module.exports = function (accountID, entryType, query = "") {
    accountID = db.pool.escape(accountID);
    entryType = db.pool.escape(entryType);
    const entryDate = db.pool.escape(Date());
    query = db.pool.escape(query.replaceAll(`\'`, ""));

    const sql = `INSERT INTO LOG (AccountID, EntryDate, EntryType, Query) VALUES (${accountID}, NOW(), ${entryType}, ${query});`;

    console.log("Adding new audit entry: \n" + sql);

    db.pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            // throw err;
            return;
        }
    });
}
