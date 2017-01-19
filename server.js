const express = require('express');
const mailer = require('express-mailer');
const app = express();
const port = process.env.PORT || 3000;
const sendMessage = require('./sendMessage.js')

 app.get("*", function(req, res) {
    res.sendfile('index.html')
 });

 app.listen(port, function() {
   console.log("Listening on " + port);
   sendMessage();
 });
