var fs = require("fs");
var readline = require("readline");
var google = require("googleapis");
var googleAuth = require("google-auth-library");
var c;
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
var TOKEN_DIR =
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
  "/.credentials/";
var TOKEN_PATH = TOKEN_DIR + "sheets.googleapis.com-nodejs-quickstart.json";

// Load client secrets from a local file.
fs.readFile("client_secret.json", function processClientSecrets(err, content) {
  if (err) {
    console.log("Error loading client secret file: " + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  c = content;
  console.log(c);
  //authorize(JSON.parse(content), listMajors);
  //authorize(JSON.parse(content), write);

  //authorize(JSON.parse(content), createSheet);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      console.log(token);
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log("Error while trying to retrieve access token", err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != "EEXIST") {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log("Token stored to " + TOKEN_PATH);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors(auth) {
  var sheets = google.sheets("v4");
  sheets.spreadsheets.values.get(
    {
      auth: auth,
      spreadsheetId: "1ijZDW8KwqOkW-o06rDybz5mprAsLSA8kyjaImJDCY1w",
      range: "C2:3"
    },
    function(err, response) {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
      var rows = response.values;
      if (rows.length == 0) {
        console.log("No data found.");
      } else {
        console.log("Name, Major:");
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          console.log("%s, %s", row[0], row[4]);
          console.log(rows);
        }
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
          title: "Test Create"
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
    }
  );
}
/*function write(auth) {
  var id = "1mKw1_QfofAOhJt-gud-5Trphct9hYtZHleit7l1eITU";
  var values = [["1-1", "1-2", "1-3"], ["2-1", "2-2", "2-3"]];
  var body = {
    values: values
  };
  var sheets = google.sheets("v4");
  sheets.spreadsheets.values.update(
    {
      auth: auth,
      spreadsheetId: id,
      range: "A1:C2",
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
}*/

module.exports = {
  authenticate: authorize
};
