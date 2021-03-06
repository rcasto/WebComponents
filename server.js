var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

// Setup static routing
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(port, function () {
    console.log('Server started on port:', port);
});