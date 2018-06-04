var express = require('express');
var app = express();
const api = require('./routes/api');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', api);

app.get('/', (req, res) =>{
  res.send('Home');
})


app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
