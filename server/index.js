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

app.use(express.json());

app.post("/form/formName", (req, res) => {
    var formName = req.params.formName;
    request(
        {
            uri:
                "https://ihmeuw.wufoo.com/api/v3/forms/comment-form-gbd-2016-cancer-paper/entries.json?sort=EntryId&sortDirection=DESC",
            method: "GET",
            auth: {
                username: userName,
                password: "footastic",
                sendImmediately: false
            }
        },
        function(error, response, body) {
            //console.log(body);
            var obj = JSON.parse(body).Entries;

            //console.log(obj.Entries[0]);
            for (var index in obj) {
                //console.log(obj[index].Field47);
                let entry = {
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
        }
    );

    res.send("hi");
});

// clean each category
function processData(e) {
    //console.log(e);

    // check if email is duplicated
    if (!emailSet.has(e.email)) {
        emailSet.add(e.email);
        clean(e.numericalResult, e, "numericalResult");
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
                    formName: "temp", // replace it with request parameter
                    collaborator: e.fullName,
                    email: e.email,
                    category: cat,
                    comment: current
                };
                console.log(aLine);
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
