("use strict");

// account key + random password
//var auth = base64("DNNA-7JKC-SN41-K6MU:footastic");
//var auth = base64("5HVU-YCN1-83VZ-NH8Z:footastic");

//var userName = "DNNA-7JKC-SN41-K6MU"; // change to local variable later
var userName = "5HVU-YCN1-83VZ-NH8Z";
var pass = "footastic"; // change to local variable later
// send request to form
var request = require("request");

// google api
var auth = require("./quickstart.js");
var fs = require("fs");
var google = require("googleapis");

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
var bodyParser = require("body-parser");

const MemStore = require("./memstore");

// map
var HashMap = require("hashmap");
var map1 = new HashMap();
var sheetIDMap = new HashMap();
var map2 = new HashMap();
populateCause(map2);
var wordBank = new HashMap();
populateWordBank(wordBank);
let memStore = new MemStore(map1, map2, wordBank);

var startLength = 0;
var headIndex = 0;
var currentForm = "";
var currentSheetID = "";

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

app.use(bodyParser.json());

app.get("/test", (req, res) => {
  //let arr = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let q = new Date();
  let m = q.getMonth() + 1 - 2;
  if (m <= 0) {
    m += 12;
  }
  let d = q.getDay();
  let y = q.getFullYear();
  let date = new Date(y, m, d);
});

app.post("/causeGroup", (req, res) => {
  console.log(req.body);
  let r = req.body;
  var loop = new Promise((resolve, reject) => {
    Object.keys(r).forEach(function(key) {
      memStore.insertCauseGroup(key, r[key]);
    });
    resolve();
  });
  loop.then(() => {
    res.send(memStore.getAllCauseGroup());
  });
});

app.post("/wordBank", (req, res) => {
  let data = req.body;
  memStore.insertWordBank(data.category, data.word.toLowerCase());
  res.send(memStore.getAllWords(data.category));
});

app.delete("/wordBank", (req, res) => {
  let data = req.body;
  memStore.deleteWord(data.category, data.word.toLowerCase());
  res.send(memStore.getAllWords(data.category));
});

app.get("/form/:formName/:sheetID", (req, res) => {
  let formName = req.params.formName;
  let sheetID = req.params.sheetID;
  currentForm = formName;
  if (!sheetIDMap.get(formName)) {
    sheetIDMap.set(formName, sheetID);
  }
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
          firstName: obj[index].Field47,
          lastName: obj[index].Field48,
          email: obj[index].Field7,
          numericalResult: obj[index].Field52,
          descrOfMethod: obj[index].Field62,
          methodological: obj[index].Field87,
          dataSource: obj[index].Field59,
          narrativeStructure: obj[index].Field85,
          futureDirection: obj[index].Field61,
          tableAndFigure: obj[index].Field54,
          methodAppendix: obj[index].Field50
        };
        //console.log(entry);
        processData(entry, "topic");
      }

      // start writing
      fs.readFile("client_secret.json", function processClientSecrets(
        err,
        content
      ) {
        if (err) {
          console.log("Error loading client secret file: " + err);
          return;
        }
        auth.authenticate(JSON.parse(content), write);
      });

      res.json(obj);
    }
  );
});

app.get("/form/:formName", (req, res) => {
  var formName = req.params.formName;
  res.json(memStore.getAllComment(formName));
});

// Capstone Paper
app.get("/capstoneForm/:formName/:sheetID", (req, res) => {
  let formName = req.params.formName;
  let sheetID = req.params.sheetID;
  currentForm = formName;
  if (!sheetIDMap.get(formName)) {
    sheetIDMap.set(formName, sheetID);
  }
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
        var sets = {
          127: new Set(),
          227: new Set(),
          327: new Set(),
          427: new Set(),
          527: new Set()
        };

        for (var j = 127; j <= 527; j += 100) {
          var categorySet = sets[j];
          for (var i = j; i <= j + 15; i++) {
            key = "Field" + i;
            //console.log(key);
            //console.log(obj[index][key]);
            if (obj[index][key]) {
              categorySet.add(obj[index][key]); // add category
            }
          }
        }
        //console.log(sets);

        let entry = {
          formName: formName,
          firstName: obj[index].Field47,
          lastName: obj[index].Field48,
          email: obj[index].Field7,

          // numerical result multiple
          numericalResultCat1: sets["127"],
          numericalResult1: obj[index].Field105,
          //hasNextNu1: obj[index].Field114,
          numericalResultCat2: sets["227"],
          numericalResult2: obj[index].Field116,
          //hasNextNu2: obj[index].Field116,
          numericalResultCat3: sets["327"],
          numericalResult3: obj[index].Field111,

          descrOfMethod: obj[index].Field62,

          // methodological feeback multiple
          methodological1: obj[index].Field87,
          methodologicalCat1: sets["427"],
          //hasNextMethod: obj[index].Field123,
          methodological2: obj[index].Field50,
          methodologicalCat2: sets["527"],

          dataSource: obj[index].Field59,
          narrativeStructure: obj[index].Field85,
          futureDirection: obj[index].Field61
          /*tableAndFigure: obj[index].Field54,
          methodAppendix: obj[index].Field50,
          supplementaryAppendix: obj[index].Field119,
          writeupAppendix: obj[index].Field120*/
        };
        //console.log(entry);
        processData(entry, "capstone");
      }

      // start writing

      fs.readFile("client_secret.json", function processClientSecrets(
        err,
        content
      ) {
        if (err) {
          console.log("Error loading client secret file: " + err);
          return;
        }
        auth.authenticate(JSON.parse(content), write);
      });

      res.send("hi");
    }
  );
});

// Capstone Paper
app.get("/capstoneForm2/:formName/:sheetID", (req, res) => {
  let formName = req.params.formName;
  let sheetID = req.params.sheetID;
  currentForm = formName;
  if (!sheetIDMap.get(formName)) {
    sheetIDMap.set(formName, sheetID);
  }
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
        var sets = {
          327: new Set(),
          425: new Set(),
          526: new Set()
        };

        for (var ind in sets) {
          var categorySet = sets[ind];
          var j;
          if (ind == 0) {
            j = 327;
          } else if (ind == 1) {
            j = 425;
          } else {
            j = 526;
          }
          for (var i = j; i <= j + 15; i++) {
            key = "Field" + i;
            //console.log(key);
            //console.log(obj[index][key]);
            if (obj[index][key]) {
              categorySet.add(obj[index][key]); // add category
            }
          }
        }
        //console.log(sets);

        let entry = {
          formName: formName,
          firstName: obj[index].Field47,
          lastName: obj[index].Field48,
          email: obj[index].Field7,

          tableAndFigure: obj[index].Field54,
          methodAppendix: obj[index].Field50,
          supplementaryAppendix: obj[index].Field119,
          writeupAppendix: obj[index].Field120,
          hasViz1: obj[index].Field323,
          viz1: obj[index].Field111,
          vizCat1: sets["526"],
          hasViz2: obj[index].Field525,
          viz2: obj[index].Field122,
          vizCat2: sets["324"],
          hasViz3: obj[index].Field626,
          viz3: obj[index].Field424,
          vizCat3: sets["425"]
        };
        //console.log(entry);
        processData(entry, "capstone2");
      }

      // start writing
      fs.readFile("client_secret.json", function processClientSecrets(
        err,
        content
      ) {
        if (err) {
          console.log("Error loading client secret file: " + err);
          return;
        }
        auth.authenticate(JSON.parse(content), write);
      });
      res.send("hi");
    }
  );
});

// clean each category
function processData(e, type) {
  //console.log(e);

  // check if email is duplicated
  if (!emailSet.has(e.email)) {
    emailSet.add(e.email);

    if (type != "capstone2") {
      clean(e.descrOfMethod, e, "descrOfMethod", "");
      clean(e.dataSource, e, "dataSource", "");
      clean(e.narrativeStructure, e, "narrativeStructure", "");
      clean(e.futureDirection, e, "futureDirection", "");
    }

    if (type == "capstone") {
      clean(e.numericalResult1, e, "numericalResult", "numericalResultCat1");
      clean(e.numericalResult2, e, "numericalResult", "numericalResultCat2");
      clean(e.numericalResult3, e, "numericalResult", "numericalResultCat3");
      clean(e.methodological1, e, "methodological", "methodologicalCat1");
      clean(e.methodological2, e, "methodological", "methodologicalCat2");
    } else if (type == "capstone2") {
      clean(e.tableAndFigure, e, "tableAndFigure", "");
      clean(e.supplementaryAppendix, e, "supplementaryAppendix", "");
      clean(e.writeupAppendix, e, "writeupAppendix", "");
      clean(e.methodAppendix, e, "methodAppendix", "");
      clean(e.viz1, e, "viz comment", "vizCat1");
      clean(e.viz2, e, "viz comment", "vizCat2");
      clean(e.viz3, e, "viz comment", "vizCat3");
    } else {
      clean(e.numericalResult, e, "numericalResult", "");
      clean(e.methodological, e, "methodological", "");
      clean(e.methodAppendix, e, "appendix", "");
    }
  }
}

/* 
ignore empty && unnecessary && duplicated comments
split comment by •
call to save into db
*/

function clean(str, e, cat, cause) {
  if (
    str != null ||
    str != "" ||
    str.split(" ").length > 3 ||
    !commentSet.has(str)
  ) {
    console.log(str);
    console.log(cat);
    var strArr = str.split("•");
    var today = new Date();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();
    var date = mm + "/" + dd;
    for (var index in strArr) {
      var current = strArr[index];

      if (!commentSet.has(current) /*&& current.split(" ").length > 3*/) {
        commentSet.add(current);
        //console.log(current);

        startLength++;
        let aLine = {
          formName: e.formName, // replace it with request parameter
          firstName: e.firstName,
          lastName: e.lastName,
          email: e.email,
          category: cat,
          comment: current,
          causeGroup: "",
          dateAdded: date,
          assignee: "",
          recommendedTriage: ""
        };

        let a = current
          .toLowerCase()
          .replace(".", "")
          .split(" ");
        //console.log("KEYS: " + memStore.getKeys());
        //noRes.some(e => a.includes(e));
        if (a.length <= 4) {
          aLine.recommendedTriage = "No response needed";
        } else {
          for (var key of memStore.getKeys() /*wordBank.keys()*/) {
            console.log("THIS IS KEY: " + key);
            var words = memStore.getAllWords(key); //wordBank.get(key);
            console.log(words);
            if (words.some(e => a.includes(e))) {
              aLine.recommendedTriage = key;
              break;
            }
          }
        }

        var thisCause = "";
        if (cause.length > 0 && e[cause] != null) {
          for (let c of e[cause].values()) {
            aLine.causeGroup += c + "\n";
            aLine.assignee += memStore.getAssignee(c) + "\n";
          }
        }

        let onlyVal = [
          e.firstName,
          e.lastName,
          e.email,
          cat,
          current,
          date,
          aLine.causeGroup,
          aLine.assignee,
          aLine.recommendedTriage
        ];

        //console.log("aLine: " + aLine);
        //memStore.insertComment(aLine);
        memStore.insertCommentValue(onlyVal, currentForm);
        //console.log(memStore.getAllComment(currentForm));
      }
    }
  }
}

// get all forms
app.get("/allForms", (req, res) => {
  memStore.deleteAllForm();
  let q = new Date();
  let m = q.getMonth() - 2;
  if (m <= 0) {
    m += 12;
  }
  let d = q.getDay();
  let y = q.getFullYear();
  let date = new Date(y, m, d);

  request(
    {
      uri: baseUrl + "forms.json",
      method: "GET",
      auth: {
        username: userName,
        password: pass,
        sendImmediately: false
      }
    },
    async function(error, response, body) {
      var obj = JSON.parse(body).Forms;
      for (var index in obj) {
        let form = {
          name: obj[index].Name,
          dateCreate: obj[index].DateCreated,
          dateUpdated: obj[index].DateUpdated,
          url: obj[index].Url,
          totalEntries: 0,
          type: ""
        };
        if (new Date(form.dateUpdated) > date) {
          if (form.url.includes("capstone")) {
            form.type = "capstone";
            if (form.url.includes("page-2")) {
              form.type = "capstone2";
            }
          }
          memStore.insertForm(form);
          console.log(form);
        }
      }
      let forms = memStore.getAllForm();
      const promises = forms.map(updateCount);
      await Promise.all(promises);
      //await updateCount(forms);
      console.log("done");
      res.json(memStore.getAllForm());
    }
  );
});

function updateCount(form) {
  return new Promise(function(resolve, reject) {
    request(
      {
        uri: baseUrl + "forms/" + form.url + "/entries/count.json",
        method: "GET",
        auth: {
          username: userName,
          password: pass,
          sendImmediately: false
        }
      },
      function(error, response, body) {
        // in addition to parsing the value, deal with possible errors
        if (error) return reject(error);
        try {
          // JSON.parse() can throw an exception if not valid JSON
          //console.log("in");
          form.totalEntries = JSON.parse(body).EntryCount;
          resolve(JSON.parse(body).EntryCount);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

// create a new sheet
app.post("/sheet/:sheetName", (req, res) => {
  let sheetName = req.params.sheetName;
  currentForm = sheetName;
  fs.readFile("client_secret.json", function processClientSecrets(
    err,
    content
  ) {
    if (err) {
      console.log("Error loading client secret file: " + err);
      return;
    }
    auth.authenticate(JSON.parse(content), createSheet);
  });

  setTimeout(() => res.send(currentSheetID), 1200);
});

// get form entry count
app.get("/count/:formName", (req, res) => {
  let formName = req.params.formName;
  let url = baseUrl + "forms/" + formName + "/entries/count.json";
  request(
    {
      uri: url,
      method: "GET",
      auth: {
        username: userName,
        password: pass,
        sendImmediately: false
      }
    },
    function(error, response, body) {
      res.json(JSON.parse(body));
    }
  );
});

// this is a test api
app.get("/func", (req, res) => {
  fs.readFile("client_secret.json", function processClientSecrets(
    err,
    content
  ) {
    if (err) {
      console.log("Error loading client secret file: " + err);
      return;
    }
    auth.authenticate(JSON.parse(content), write);
  });
  res.send(typeof auth.authenticate);
});

// write to google sheet
app.post("/importForm/:sheetID", (req, res) => {
  var sheetID = req.params.sheetID;
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

function write(auth) {
  var formName = "comment-form-gbd-2016-cancer-paper";
  let values = memStore.getAllComment(currentForm);
  let count = startLength + 2;
  let range = "B2:J" + count;
  //var values = [["1-1", "1-2", "1-3"], ["2-1", "2-2", "2-3"]];
  var body = {
    values: values
  };
  var headers = [
    [
      "First name",
      "Last name",
      "Email",
      "Category",
      "Comment",
      "Date",
      "Cause/Cause Group",
      "Assignee",
      "Recommended Triage"
    ]
  ];
  var headerBody = { values: headers };
  var sheets = google.sheets("v4");
  if (headIndex == 0) {
    sheets.spreadsheets.values.update(
      {
        auth: auth,
        spreadsheetId: sheetIDMap.get(currentForm),
        range: "B1:J1",
        valueInputOption: "USER_ENTERED",
        resource: headerBody
      },
      function(err, result) {
        if (err) {
          // Handle error
          console.log(err);
        } else {
          console.log("%d cells updated.", result.updatedCells);
        }
      }
    );
  }
  sheets.spreadsheets.values.update(
    {
      auth: auth,
      spreadsheetId: sheetIDMap.get(currentForm),
      range: range,
      valueInputOption: "USER_ENTERED",
      resource: body
    },
    function(err, result) {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        console.log("%d cells updated.", result.updatedCells);
      }
    }
  );
}

function createSheet(auth) {
  var sheets = google.sheets("v4");
  sheets.spreadsheets.create(
    {
      auth: auth,
      resource: {
        properties: {
          title: currentForm
        }
      }
    },
    function(err, response) {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
      console.log("sucess!");
      console.log(response.spreadsheetId);
      currentSheetID = response.spreadsheetId;
    }
  );
}

function populateCause(map) {
  let originCause = {
    "Cardiovascular disorders & Neoplasms": "Tahiya",
    "Congenital disorders": "Helen",
    "Diabetes & Kidney diseases": "Mari",
    "Digestive disorders": "Katya",
    "Enteric & Respiratory infections": "Brigette",
    "Genitourinary conditions": "Mari",
    "HIV/Tuberculosis": "Molly",
    "Hemoglobinopathies, anemias": "Helen",
    Injuries: "Caitie",
    "Mental and substance use disorders": "Mari",
    "Neglected tropical diseases": "Shreya",
    "Neurological conditions": "Mari",
    "Sense organ disorders": "Mari",
    "Sexually transmitted infections": "Mari",
    "Skin conditions": "Katya"
  };

  for (var key in originCause) {
    map.set(key, originCause[key]);
    //console.log(map.get(key));
  }
}

function populateWordBank(map) {
  let originWordBank = {
    "Tables And Figures": [
      "table",
      "tables",
      "figure",
      "figures",
      "caption",
      "legend",
      "color",
      "colors",
      "colour",
      "colours"
    ],
    Manuscript: [
      "wording",
      "language",
      "replace",
      "rephrase",
      "clarify",
      "explain",
      "reference"
    ],
    Priority: ["model", "modell"],
    "Future Implications": ["future", "next time", "next gbd"],
    "No Respond Needed": [
      "great",
      "excellent",
      "adequate",
      "sufficient",
      "appropriate",
      "good",
      "fantastic",
      "impressive"
    ]
  };
  for (var key in originWordBank) {
    map.set(key, originWordBank[key]);
    //console.log(map.get(key));
  }
}
// returns details on all the forms you have permission to access

// returns a specific form

/*
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
*/
