// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api", function (req, res) {
  var d = new Date ();
  res.json ({ unix: d.getTime(), utc: d.toUTCString() });
});

app.get("/api/:word", function (req, res) {
  var d = req.params.word ? new Date (req.params.word) : new Date ();
  if (!d.getTime()) d = new Date (parseInt (req.params.word));
  if (!d.getTime()) res.json ({error: 'Invalid Date'});
  else res.json ({ unix: d.getTime(), utc: d.toUTCString() });
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 47000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
