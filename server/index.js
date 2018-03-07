"use strict";

// account key + random password
//var auth = base64("DNNA-7JKC-SN41-K6MU:footastic");
//var auth = base64("5HVU-YCN1-83VZ-NH8Z:footastic");

//var userName = "DNNA-7JKC-SN41-K6MU"; // change to local variable later
var userName = "5HVU-YCN1-83VZ-NH8Z";
var pass = "footastic"; // change to local variable later
// send request to form
var request = require("request");

// base request url
var baseUrl = "https://ihmeuw.wufoo.com/api/v3/";

// postman:
// Authorization : Basic RE5OQS03SktDLVNONDEtSzZNVTogZm9vdGFzdGlj
var commentSet = new Set();
var emailSet = new Set();

// server stuff
const express = require("express");
const app = express();
const mongodb = require("mongodb");

const MemStore = require("./memstore");

// map
var HashMap = require("hashmap");
var map1 = new HashMap();
let memStore = new MemStore(map1);

//app.use(express.json());
app.use(function(req, res, next) {
    express.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next();
});

app.post("/form/:formName", (req, res) => {
    var formName = req.params.formName;
    console.log(formName);
    var o = null;
    var url =
        "https://ihmeuw.wufoo.com/api/v3/forms/" +
        formName +
        "/entries.json?sort=EntryId&sortDirection=DESC";
    request(
        {
            uri: url,
            method: "GET",
            auth: {
                username: userName,
                password: "footastic",
                sendImmediately: false
            }
        },
        function(error, response, body) {
            var obj = JSON.parse(body).Entries;
            for (var index in obj) {
                let entry = {
                    formName: formName,
                    fullName: obj[index].Field47 + " " + obj[index].Field48,
                    email: obj[index].Field7,
                    numericalResult: obj[index].Field52,
                    descrOfMethod: obj[index].Field62,
                    methodological: obj[index].Field87,
                    dataSource: obj[index].Field59,
                    narrativeStructure: obj[index].Field85,
                    futureDirection: obj[index].Field61,
                    tableAndFigure: obj[index].Field54,
                    appendix: obj[index].Field50
                };
                //console.log(entry);
                processData(entry);
            }
            res.json(obj);
        }
    );
});

app.get("/form/:formName", (req, res) => {
    var formName = req.params.formName;
    res.json(memStore.getAllComment(formName));
});

// clean each category
function processData(e) {
    //console.log(e);

    // check if email is duplicated
    if (!emailSet.has(e.email)) {
        emailSet.add(e.email);
        clean(e.numericalResult, e, "numericalResult");
        clean(e.descrOfMethod, e, "descrOfMethod");
        clean(e.methodological, e, "methodological");
        clean(e.dataSource, e, "dataSource");
        clean(e.narrativeStructure, e, "narrativeStructure");
        clean(e.futureDirection, e, "futureDirection");
        clean(e.tableAndFigure, e, "tableAndFigure");
        clean(e.appendix, e, "appendix");
    }
}

/* 
ignore empty && unnecessary && duplicated comments
split comment by •
call to save into db
*/

function clean(str, e, cat) {
    if (
        str != null ||
        str != "" ||
        str.split(" ").length > 3 ||
        !commentSet.has(str)
    ) {
        var strArr = str.split("•");
        for (var index in strArr) {
            var current = strArr[index];
            if (!commentSet.has(current) && current.split(" ").length > 3) {
                commentSet.add(current);
                //console.log(current);
                let aLine = {
                    formName: e.formName, // replace it with request parameter
                    collaborator: e.fullName,
                    email: e.email,
                    category: cat,
                    comment: current
                };
                memStore.insertComment(aLine);

                //console.log(aLine);
                console.log(memStore.getAllComment(e.formName));
            }
        }
    }
}

app.listen(3000, () => console.log("Example app listening on port 3000!"));
// returns details on all the forms you have permission to access
/*request(
    {
        uri: baseUrl + "froms.json",
        method: "GET",
        auth: {
            username: userName,
            password: pass,
            sendImmediately: false
        }
    },
    function(error, response, body) {
        console.log(body);
    }
);

// returns a specific form

request(
    {
        uri: baseUrl + "forms/zmi7o29077l3ga.json",
        method: "GET",
        auth: {
            username: userName,
            password: pass,
            sendImmediately: false
        }
    },
    function(error, response, body) {
        console.log(body);
    }
);

// returns the entries that have been submitted to a specific form

request(
    {
        uri:
            baseUrl +
            "forms/zmi7o29077l3ga/entries.json?sort=EntryId&sortDirection=DESC",
        method: "GET",
        auth: {
            username: userName,
            password: pass,
            sendImmediately: false
        }
    },
    function(error, response, body) {
        console.log(body);
    }
);

// get form entry count

request(
    {
        uri: baseUrl + "forms/zmi7o29077l3ga/entries/count.json",
        method: "GET",
        auth: {
            username: userName,
            password: pass,
            sendImmediately: false
        }
    },
    function(error, response, body) {
        console.log(body);
    }
);*/
