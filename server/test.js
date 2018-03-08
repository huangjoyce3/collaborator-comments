let google = require("googleapis");
let authentication = require("./authentication");

function getData(auth) {
  var sheets = google.sheets("v4");
  sheets.spreadsheets.values.get(
    {
      auth: auth,
      spreadsheetId: "yourSpreadSheetIDHere",
      range: "Sheet1!A2:C" //Change Sheet1 if your worksheet's name is something else
    },
    (err, response) => {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
    }
  );
}

authentication.authenticate().then(auth => {
  getData(auth);
});
