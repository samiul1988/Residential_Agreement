var express = require('express');
// const cors = require('cors');
// var proxy = require('http-proxy-middleware');
var path = require('path');

const app = express();
const publicPath = path.join(__dirname, 'public');
const port  = process.env.PORT || 3000;


let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.use(express.static(publicPath));

app.listen(port,()=>{ 
    console.log("server is up");
});