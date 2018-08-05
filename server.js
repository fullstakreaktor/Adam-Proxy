
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3004;
const request = require('request');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware')

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));


var heroProxy = proxy('/api/hero', {target: 'http://52.49.157.131:3000'});
var reservationProxy = proxy('/api/reservation', {target: 'http://35.163.43.209:80'});
var reviewsProxy = proxy('/api/reviews', {target: 'http://18.222.240.125:3002'});
var aboutProxy = proxy('/api/about', {target: 'http://18.222.196.193:3001'})

app.use(heroProxy);
app.use(reservationProxy);
app.use(reviewsProxy);
app.use(aboutProxy);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});