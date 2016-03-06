var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html')); 
});

app.listen(port, function () {
   console.log('Server started on port:', port); 
});