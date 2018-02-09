"use strict";

// account key + random password
var auth = base64("DNNA-7JKC-SN41-K6MU:footastic");

var userName = "DNNA-7JKC-SN41-K6MU"; // change to local variable later
var pass = "footastic"; // change to local variable later
// send request to form
var request = require("request");

// base request url
var baseUrl = "https://capstoneihme.wufoo.com/api/v3/";

// postman:
// Authorization : Basic RE5OQS03SktDLVNONDEtSzZNVTogZm9vdGFzdGlj

// server stuff
const express = require("express");
const app = express();
const mongodb = require("mongodb");

app.use(express.json());

// returns details on all the forms you have permission to access
request(
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
);
