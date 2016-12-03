var express = require('express');
var router = express.Router();
var monk = require('monk');
var MongoDB = monk('root:password@ds159737.mlab.com:59737/team-8');

function json_encode(mixed_val) {
  return JSON.stringify(mixed_val);
}

router.get('/', function (req, res) {
  res.sendFile(appRoot + '/public/index.html');
});

router.route("/cities/:_id").get(function (req, res) {
  let _id = req.params._id;
  let start = req.query.start;
  let count = req.query.count;
  if (start === undefined) {
    start = 0;
  } else {
    start = parseInt(start);
  }
  if (count === undefined) {
    count = 200;
  } else {
    count = parseInt(count);
  }
  MongoDB.get("cities").find({ "_id": _id }, { limit: count, skip: start }, function (err, rows) {
    let result = {};
    if (err !== null) {
      result.error = err;
    }
    else {
      result.results = rows;
    }
    res.setHeader('content-type', 'text/json');
    res.send(json_encode(result));
  });
});

router.get("/cities/", function (req, res) {
  let start = req.query.start;
  let count = req.query.count;
  if (start === undefined) {
    start = 0;
  } else {
    start = parseInt(start);
  }

  if (count === undefined) {
    count = 200;
  } else {
    count = parseInt(count);
  }

  MongoDB.get("cities").find({}, { limit: count, skip: start }, function (err, rows) {
    let result = {};
    if (err !== null) {
      result.error = err;
    } else {
      result.results = rows;
    }
    res.setHeader('content-type', 'text/json');
    res.send(json_encode(result));
  });
});

router.get("/details/:city", function (req, res) {
  let city = (req.params.city);
  let request = require("request");

  var options = {
    method: 'GET',
    url: 'https://en.wikipedia.org/w/api.php',
    qs:
    {
      action: 'query',
      prop: 'extracts',
      format: 'json',
      titles: city
    },
    headers:
    {
      'postman-token': '48001125-ff89-21e4-aa63-b7eb3b952bb1',
      'cache-control': 'no-cache'
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.setHeader('content-type', 'text/json');
    res.send(json_encode(body));
  });
});


module.exports = router;