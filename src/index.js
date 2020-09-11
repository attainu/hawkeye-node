// Node Core Module Setup
// var http = require('http');
// var port = 3001;
// var hostname = 'localhost';
// var server = http.createServer(function(request,response){
//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'text/plain');
//     response.end('Welcome to Node');
// });

// server.listen(port,hostname, function(){
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

//EXPRESS Framework Setup
// var express = require('express');
import  express from 'express';
import path from 'path';
import bodyParser from 'body-parser';


import indexRoute from './routes/index';
import signupRoute from './routes/signup';
import profileRoute from './routes/profile';
import signupApiRoute from './routes/signupApi';

import './config/dbconfig';

const app = express();

app.set('views', path.join(__dirname, 'views'));

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.set('view engine', 'ejs');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3001;
const hostname = 'localhost';

app.use('/',indexRoute);
app.use('/signup',signupRoute);
app.use('/profile',profileRoute);
app.use('/api',signupApiRoute);


app.listen(port,hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
