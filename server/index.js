"use strict";

// account key + random password
var auth = base64("DNNA-7JKC-SN41-K6MU:footastic");

// send request to form
var request = require("request");

// base request url
var baseUrl = "https://capstoneihme.wufoo.com/api/v3/";

// returns details on all the forms you have permission to access
request(
    {
        uri: baseUrl + "froms.json",
        method: "GET",
        auth: {
            username: "DNNA-7JKC-SN41-K6MU",
            password: "footastic",
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
        uri: baseUrl + "zmi7o29077l3ga.json",
        method: "GET",
        auth: {
            username: "DNNA-7JKC-SN41-K6MU",
            password: "footastic",
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
            "zmi7o29077l3ga/entries.json?sort=EntryId&sortDirection=DESC",
        method: "GET",
        auth: {
            username: "DNNA-7JKC-SN41-K6MU",
            password: "footastic",
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
        uri: baseUrl + "zmi7o29077l3ga/entries/count.json",
        method: "GET",
        auth: {
            username: "DNNA-7JKC-SN41-K6MU",
            password: "footastic",
            sendImmediately: false
        }
    },
    function(error, response, body) {
        console.log(body);
    }
);
