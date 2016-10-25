let express = require('express'),
    path = require('path'),
    app = express();

let port = process.env.PORT || 8080;


//Date from unix route
app.get('/:date(\\d+)/', (req, res) => {
  let date = new Date(parseInt(req.params.date * 1000, 10));
  payload = jsonDate(date);
  res.json(payload);
});

//Date from natural languae route
app.get('/:date', (req, res) => {
  let date = new Date(req.params.date);
  payload = jsonDate(date);
  res.json(payload)
});

//index/example of use route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

//turns Date into payload object
function jsonDate(date){
  let dateData = {};
  if(date instanceof Date && isFinite(date)){
    dateData.unix = Math.floor(date.getTime() / 1000);
    let month = date.toLocaleString("en-us", { month: "long" });
    dateData.natural = month + " " + date.getUTCDate() + ", " + date.getUTCFullYear()
  }
  else {
    dateData = {
      unix: null,
      natural: null
    }
  }
  return dateData
}
