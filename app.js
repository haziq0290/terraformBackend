var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/config');
require('./models/db');

var bodyParser = require('body-parser');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var azureAuthRouter = require('./routes/azure');

var app = express();
app.use(bodyParser.json());
app.use(cors());
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*'); //http://localhost:3000,
	res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','*');
	res.setHeader('Access-Control-Allow-Credentials','true');
	next();
});*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/azure', azureAuthRouter);

module.exports = app;
